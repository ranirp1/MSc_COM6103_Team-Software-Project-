from io import BytesIO
import uuid
import pytest
from flask import json
import sys
import os

# Adjust the system path to ensure the Flask app is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app as flask_app, db, User, UserDevice, Device# Import the Flask application and database

@pytest.fixture(scope='module')
def app():
    """Create and configure a new app instance for each test module."""
    # Configure the Flask application for testing
    flask_app.config.update({
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'TESTING': True,
        'SECRET_KEY': 'test'
    })
    # Establish an application context before running the tests
    with flask_app.app_context():
        db.create_all()  # Create all tables for the in-memory database
        yield flask_app
        db.session.remove()
        db.drop_all()  # Drop all tables after tests complete

@pytest.fixture(scope='function')
def client(app):
    """A test client for the app. This fixture is re-evaluated for each test function."""
    return app.test_client()


@pytest.fixture(scope='function')
def init_database():
    """Initialize the database for each test to ensure a clean state."""
    # Delete records in dependent tables first
    db.session.query(UserDevice).delete()
    db.session.commit()

    # Now it's safe to delete records in the User table
    db.session.query(User).delete()
    db.session.commit()

    # Optionally add a default user or other initial setup here
    user = User(email="test@example.com", password="test123", first_name="Test", last_name="User", phoneNumber="1234567890")
    db.session.add(user)
    db.session.commit()

    yield user  # This allows the test to run with this setup and ensures that 'user' is directly usable in tests

    # Cleanup, not strictly necessary if you're dropping tables or the database afterwards
    db.session.close()

@pytest.fixture(scope='function')
def add_user():
    """Helper fixture to add users during tests."""
    def _add_user(email, password, first_name, last_name, phone_number):
        user = User(email=email, password=password, first_name=first_name,
                    last_name=last_name, phoneNumber=phone_number)
        db.session.add(user)
        db.session.commit()
        return user
    return _add_user




def test_update_device_visibility_success(client, init_database, add_user):
    """Test updating device visibility successfully."""
    # Setup initial database state
    init_database

    # Create a regular user
    user = add_user("user@example.com", "password123", "User", "One", "1234567890")

    # Directly update the user to staff in the database to avoid dependency on another API
    user.isStaff = True
    db.session.commit()  # Ensure the staff status change is committed

    # Generate a unique model name to prevent collision
    unique_model = f'UniqueModel-{uuid.uuid4()}'

    # Add a device for the now-staff user
    device_data = {
        'userID': user.id,
        'brand': 'NewBrand',
        'model': unique_model,
        'deviceClassification': 'High',
        'deviceColor': 'Black',
        'deviceStorage': '256GB',
        'deviceCondition': 'New',
        'qrCodeUrl': 'http://example.com/qr.png',
        'dateofRelease': '2020-01-01',
        'dateofPurchase': '2020-02-01',
        'image': (BytesIO(b'my file contents'), 'image.jpg')
    }
    client.post('/api/createDevice', content_type='multipart/form-data', data=device_data)

    # Fetch the newly added device
    device = Device.query.filter_by(model=unique_model).first()

    # Prepare data for updating the device visibility
    visibility_data = {
        'email': user.email,
        'device_id': device.deviceID,
        'is_visible': True
    }

    # Make the POST request to update device visibility
    response = client.post('/api/updateDeviceVisibility', json=visibility_data)
    assert response.status_code == 200, response.json
    assert response.json == {'message': 'Device visibility updated successfully'}

    # Verify the device visibility was updated in the database
    updated_device = UserDevice.query.filter_by(userID=user.id, deviceID=device.deviceID).first()
    assert updated_device is not None
    assert updated_device.visible == True
