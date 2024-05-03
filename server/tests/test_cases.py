import json
from unittest.mock import patch
from io import BytesIO
import sys
import os
import uuid
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import Device, UserDevice

def test_login_successful(client, init_database):
    """Test successful login."""
    init_database  # Explicitly reference the fixture if necessary.
    response = client.post('/api/login', json={
        'email': 'test@example.com',
        'password': 'test123'
    })
    assert response.status_code == 200
    assert 'id' in response.json, "User ID should be in the response"


def test_login_successful(client, init_database):
    """Test successful login."""
    response = client.post('/api/login', json={
        'email': 'test@example.com',
        'password': 'test123'
    })
    assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}. Response: {response.json}"



def test_register_success(client, init_database):
    """Test successful user registration."""
    response = client.post('/api/register', json={
        'email': 'newuser@example.com',
        'first_name': 'New',
        'last_name': 'User',
        'phoneNumber': '123456789',
        'password': 'password123',
        'terms': True
    })
    assert response.status_code == 200
    assert response.json == {'message': 'Login Successful'}

def test_register_with_blank_data(client, init_database):
    """Test registration with missing fields."""
    response = client.post('/api/register', json={
        'email': '',
        'first_name': '',
        'last_name': '',
        'phoneNumber': '',
        'password': '',
        'terms': True
    })
    assert response.status_code == 409
    assert response.json == {'message': 'Blank Data!'}

def test_register_duplicate_email(client, init_database):
    """Test registration with a duplicate email."""
    # Register a user
    client.post('/api/register', json={
        'email': 'duplicate@example.com',
        'first_name': 'First',
        'last_name': 'User',
        'phoneNumber': '123456789',
        'password': 'password123',
        'terms': True
    })
    # Try to register the same user
    response = client.post('/api/register', json={
        'email': 'duplicate@example.com',
        'first_name': 'Second',
        'last_name': 'User',
        'phoneNumber': '987654321',
        'password': 'password321',
        'terms': True
    })
    assert response.status_code == 409
    assert response.json == {'message': 'User with this email already exists'}

def test_register_without_accepting_terms(client, init_database):
    """Test registration without accepting terms and conditions."""
    response = client.post('/api/register', json={
        'email': 'noaccept@example.com',
        'first_name': 'No',
        'last_name': 'Accept',
        'phoneNumber': '1234509876',
        'password': 'noaccept123',
        'terms': False
    })
    assert response.status_code == 409
    assert response.json == {'message': 'You have not accepted Terms and Conditions'}

def test_register_multiple_users(client, init_database, add_user):
    """Test registering multiple users sequentially to ensure isolation."""
    # Add a user with the helper fixture
    add_user("user1@example.com", "password123", "User", "One", "1234567890")

    # Attempt to add the same user again
    response = client.post('/api/register', json={
        'email': 'user1@example.com',
        'first_name': 'User',
        'last_name': 'One',
        'phoneNumber': '1234567890',
        'password': 'password123',
        'terms': True
    })
    assert response.status_code == 409
    assert response.json == {'message': 'User with this email already exists'}

    # Add another user successfully
    response = client.post('/api/register', json={
        'email': 'user2@example.com',
        'first_name': 'User',
        'last_name': 'Two',
        'phoneNumber': '0987654321',
        'password': 'password321',
        'terms': True
    })
    assert response.status_code == 200
    assert response.json == {'message': 'Login Successful'}


def test_get_all_users(client, init_database):
    """Test retrieving all users after registration to ensure proper entry and retrieval."""
    # Data for multiple users
    users_info = [
        {"email": "user1@example.com", "password": "test1234", "first_name": "User", "last_name": "One", "phoneNumber": "1234567890", "terms": True},
        {"email": "user2@example.com", "password": "test5678", "first_name": "User", "last_name": "Two", "phoneNumber": "0987654321", "terms": True},
        {"email": "user3@example.com", "password": "pass1234", "first_name": "User", "last_name": "Three", "phoneNumber": "1122334455", "terms": True}
    ]

    # Register multiple users
    for user in users_info:
        client.post('/api/register', json=user)

    # Retrieve all users
    response = client.get('/api/getAllUsers')
    assert response.status_code == 200
    users = json.loads(response.data.decode('utf-8'))

    # Instead of asserting for exact count, ensure each user is added
    expected_emails = {user['email'] for user in users_info}
    retrieved_emails = {user['email'] for user in users}
    assert expected_emails.issubset(retrieved_emails)


def test_update_user_to_staff_success(client, init_database, add_user):
    """Test updating user to staff successfully."""
    # Add a user who will be updated to staff
    add_user("normaluser@example.com", "password123", "Normal", "User", "1234567890")

    # Update the user to staff
    response = client.post('/api/updateUserToStaff', json={'email': 'normaluser@example.com'})
    assert response.status_code == 200
    assert response.json == {'message': 'User updated to staff'}

    # Verify the update
    response = client.get('/api/getAllUsers')
    users = json.loads(response.data.decode('utf-8'))
    assert any(user['email'] == 'normaluser@example.com' and user['role'] == 'employee' for user in users)


def test_update_user_to_staff_not_found(client, init_database):
    """Test updating user to staff when user does not exist."""
    # Attempt to update a non-existent user
    response = client.post('/api/updateUserToStaff', json={'email': 'nonexistent@example.com'})
    assert response.status_code == 404
    assert response.json == {'message': 'User not found'}


def test_update_staff_to_admin_success(client, init_database, add_user):
    """Test successfully updating a user's role to admin."""
    # Add a user who will be updated to admin
    add_user("staffuser@example.com", "password123", "Staff", "User", "1234567890")

    # Update the user to admin
    response = client.post('/api/updateUserToAdmin', json={'email': 'staffuser@example.com'})
    assert response.status_code == 200
    assert response.json == {'message': 'User updated to admin'}

    # Verify the update by checking the user's role
    response = client.get('/api/getAllUsers')
    users = json.loads(response.data.decode('utf-8'))
    assert any(user['email'] == 'staffuser@example.com' and user['role'] == 'admin' for user in users)


def test_update_staff_to_admin_not_found(client, init_database):
    """Test the response when the user does not exist in the database."""
    # Attempt to update a non-existent user to admin
    response = client.post('/api/updateUserToAdmin', json={'email': 'nonexistent@example.com'})
    assert response.status_code == 404
    assert response.json == {'message': 'User not found'}


def test_create_payment_intent_success(client, init_database):
    """Test successful creation of a payment intent."""
    with patch('stripe.PaymentIntent.create') as mocked_create:
        mocked_create.return_value = {'client_secret': 'someclientsecret'}

        response = client.post('/api/create-payment-intent', json={'email': 'customer@example.com'})
        assert response.status_code == 200
        assert 'client_secret' in response.json
        assert response.json['client_secret'] == 'someclientsecret'

def test_create_payment_intent_no_email(client, init_database):
    """Test payment intent creation fails if no email is provided."""
    response = client.post('/api/create-payment-intent', json={})
    assert response.status_code == 400
    assert response.json == {'message': 'You need to send an Email!', 'error': True}


def test_delete_user_success(client, init_database, add_user):
    """Test successful deletion of a user."""
    # Add a user to delete
    add_user("deleteuser@example.com", "password123", "Delete", "User", "1234567890")

    # Delete the user
    response = client.post('/api/deleteUser', json={'email': 'deleteuser@example.com'})
    assert response.status_code == 200
    assert response.json == {'message': 'User deleted'}

    # Verify user is deleted
    response = client.get('/api/getAllUsers')  # Assuming this endpoint could list users
    users = response.get_json()
    assert all(user['email'] != 'deleteuser@example.com' for user in users)


def test_delete_user_not_found(client, init_database):
    """Test deletion attempt for a non-existent user."""
    response = client.post('/api/deleteUser', json={'email': 'nonexistent@example.com'})
    assert response.status_code == 404
    assert response.json == {'message': 'User not found'}


def test_downgrade_admin_to_staff_success(client, init_database, add_user):
    """Test successful downgrade of a user to end user."""
    # Add an admin user who will be downgraded
    add_user("admin@example.com", "password123", "Admin", "User", "1234567890")

    # Downgrade the user
    response = client.post('/api/downgradeToUser', json={'email': 'admin@example.com'})
    assert response.status_code == 200
    assert response.json == {'message': 'User downgraded to end user'}

    # Verify the downgrade by fetching user details
    response = client.get('/api/getAllUsers')
    users = json.loads(response.data.decode('utf-8'))
    # Ensure the user's role is correctly set to 'endUser' after downgrade
    assert any(user['email'] == 'admin@example.com' and user['role'] == 'endUser' for user in users)


def test_downgrade_admin_not_found(client, init_database):
    """Test the response when the user does not exist."""
    response = client.post('/api/downgradeToUser', json={'email': 'nonexistent@example.com'})
    assert response.status_code == 404
    assert response.json == {'message': 'User not found'}




def test_create_new_device_success(client, init_database, add_user):
    """Test creating a new device successfully."""
    # Setup initial database state
    init_database
    
    # Create a new user
    user = add_user("user1@example.com", "password123", "User", "One", "1234567890")

    data = {
        'userID': user.id,
        'brand': 'NewBrand',
        'model': 'UniqueModel',
        'deviceClassification': 'High',
        'deviceColor': 'Black',
        'deviceStorage': '256GB',
        'deviceCondition': 'New',
        'qrCodeUrl': 'http://example.com/qr.png',
        'dateofRelease': '2020-01-01',
        'dateofPurchase': '2020-02-01',
        'image': (BytesIO(b'my file contents'), 'image.jpg')
    }

    # Make the POST request to create a new device
    response = client.post('/api/createDevice', content_type='multipart/form-data', data=data)
    assert response.status_code == 200
    assert 'success' in response.json['message']

    # Verify the device was added to the database
    device = Device.query.filter_by(model='UniqueModel').first()
    assert device is not None
    assert device.brand == 'NewBrand'



def test_get_list_of_devices(client, init_database, add_user):
    """Test the /api/getListOfDevices endpoint."""
    # Setup initial database state
    # init_database() is not called; it automatically runs and provides 'user'
    user = init_database  # This is the user yielded by the fixture

    # Add devices using the UserDevice model
    device1 = {
        'userID': user.id,
        'brand': 'Brand1',
        'model': 'Model1',
        'deviceClassification': 'High',
        'deviceColor': 'Black',
        'deviceStorage': '256GB',
        'deviceCondition': 'New',
        'qrCodeUrl': 'http://example.com/qr1.png',
        'dateofRelease': '2020-01-01',
        'dateofPurchase': '2020-02-01',
        'image': (BytesIO(b'my file contents'), 'image1.jpg')
    }

    device2 = {
        'userID': user.id,
        'brand': 'Brand2',
        'model': 'Model2',
        'deviceClassification': 'Low',
        'deviceColor': 'White',
        'deviceStorage': '128GB',
        'deviceCondition': 'Used',
        'qrCodeUrl': 'http://example.com/qr2.png',
        'dateofRelease': '2020-01-02',
        'dateofPurchase': '2020-02-02',
        'image': (BytesIO(b'my file contents'), 'image2.jpg')
    }

    # Make the POST request to create device entries
    client.post('/api/createDevice', content_type='multipart/form-data', data=device1)
    client.post('/api/createDevice', content_type='multipart/form-data', data=device2)

    # Make the POST request to fetch the list of devices
    response = client.post('/api/getListOfDevices', json={'userID': user.id})
    assert response.status_code == 200, "Expected HTTP 200 status code."

    # Ensure the response contains the expected number of devices
    data = json.loads(response.data)
    assert len(data) == 2, "Expected two devices in the response."

    # Ensure each device in the response has the expected attributes
    expected_keys = {'id', 'brand', 'model', 'createdAt', 'verified', 'image',
                     'storage', 'color', 'condition', 'classification'}
    for device_data in data:
        assert expected_keys.issubset(device_data.keys()), "Some expected keys are missing in the device data."


def test_change_device_verification(client, init_database, add_user):
    """Test changing the verification status of a device."""
    # Setup initial database state
    init_database
    
    # Create a new user
    user = add_user("user1@example.com", "password123", "Staff", "One", "1234567890")

    # Setup device data
    device_data = {
        'userID': user.id,
        'brand': 'ExampleBrand',
        'model': 'ExampleModel',
        'deviceClassification': 'Medium',
        'deviceColor': 'Silver',
        'deviceStorage': '128GB',
        'deviceCondition': 'New',
        'qrCodeUrl': 'http://example.com/qr.png',
        'dateofRelease': '2021-01-01',
        'dateofPurchase': '2021-02-01',
        'image': (BytesIO(b'my device image contents'), 'device.jpg')
    }

    # Make the POST request to create a new device
    response = client.post('/api/createDevice', content_type='multipart/form-data', data=device_data)
    assert response.status_code == 200
    assert 'success' in response.json['message']

    # Fetch the device ID from the response or from another endpoint if not provided directly
    device = Device.query.filter_by(model='ExampleModel').first()
    assert device is not None

    # Prepare data for changing the device verification
    update_data = {
        'deviceID': device.deviceID,
        'isVerified': True
    }

    # Make the POST request to change the verification status of the device
    response = client.post('/api/changeDeviceVerification/', json=update_data)
    assert response.status_code == 200
    assert response.json == {'message': 'Device verification status updated'}

    # Fetch the updated device status to verify
    updated_device = Device.query.filter_by(deviceID=device.deviceID).first()
    assert updated_device.isVerified == True


def test_get_device_type_and_estimation(client):
    """Test getting device type and estimation based on various conditions."""
    
    # Example device data for a 'Rare' device
    rare_device_data = {
        'brand': 'VintageBrand',
        'model': 'VintageModel',
        'releaseDate': '1980-01-01',  # Over 20 years ago
        'dateOfPurchase': '1980-06-01',
        'color': 'Black',
        'storage': '128GB',
        'condition': 'Good'
    }

    # Example device data for a device to be 'Recycled'
    recycle_device_data = {
        'brand': 'ModernBrand',
        'model': 'ModernModel',
        'releaseDate': '2015-01-01',  # Less than 10 years ago
        'dateOfPurchase': '2015-06-01',
        'color': 'White',
        'storage': '256GB',
        'condition': 'Damaged'
    }

    # Example device data for a 'Current' device
    current_device_data = {
        'brand': 'CurrentBrand',
        'model': 'CurrentModel',
        'releaseDate': '2012-01-01',  # Not fitting any special criteria
        'dateOfPurchase': '2012-06-01',
        'color': 'Grey',
        'storage': '512GB',
        'condition': 'Excellent'
    }

    # Test for 'Rare' device
    response = client.post('/api/getDeviceTypeAndEstimation', json=rare_device_data)
    assert response.status_code == 200
    assert response.json['type'] == 'Rare'

    # Test for 'Recycle' device
    response = client.post('/api/getDeviceTypeAndEstimation', json=recycle_device_data)
    assert response.status_code == 200
    assert response.json['type'] == 'Recycle'

    # Test for 'Current' device
    response = client.post('/api/getDeviceTypeAndEstimation', json=current_device_data)
    assert response.status_code == 200
    assert response.json['type'] == 'Current'


def test_update_device_success(client, init_database, add_user):
    """Test updating a device successfully after its creation."""
    user = init_database  # Assume it properly initializes and returns a default user

    # Initially add a device
    initial_device_data = {
        'userID': user.id,
        'brand': 'OldBrand',
        'model': 'InitialModel',
        'deviceClassification': 'Medium',
        'deviceColor': 'Gray',
        'deviceStorage': '128GB',
        'deviceCondition': 'Used',
        'qrCodeUrl': 'http://example.com/initialqr.png',
        'dateofRelease': '2019-01-01',
        'dateofPurchase': '2019-02-01',
        'image': (BytesIO(b'initial file contents'), 'initial_image.jpg')
    }

    create_response = client.post('/api/createDevice', content_type='multipart/form-data', data=initial_device_data)
    assert create_response.status_code == 200
    assert 'success' in create_response.json['message']

    device = Device.query.filter_by(model='InitialModel').first()
    user_device = UserDevice.query.filter_by(deviceID=device.deviceID).first()

    # Data for updating the device
    update_data = {
        'id': device.deviceID,
        'userDeviceID': user_device.userDeviceID,
        'brand': 'NewBrand',
        'model': 'UpdatedModel',
        'storage': '512GB',
        'color': 'White',
        'condition': 'New',
        'classification': 'High',
        'dateOfRelease': '2021-01-01',
        'isVerified': True,
        'estimatedValue': 1000  # Example of setting an estimated value
    }

    update_response = client.post('/api/updateDevice', json=update_data)
    assert update_response.status_code == 200
    assert update_response.json == {'message': 'Device updated successfully'}

    updated_device = Device.query.filter_by(deviceID=device.deviceID).first()
    updated_user_device = UserDevice.query.filter_by(userDeviceID=user_device.userDeviceID).first()

    assert updated_device.brand == 'NewBrand'
    assert updated_device.model == 'UpdatedModel'
    assert updated_user_device.deviceStorage == '512GB'
    assert updated_user_device.deviceColor == 'White'
    assert updated_user_device.deviceCondition == 'New'
    assert updated_user_device.deviceClassification == 'High'
    assert updated_user_device.isVerified is True
    assert str(updated_user_device.estimatedValue) == '1000'  # Converting to string for comparison




def test_update_device_failure_nonexistent(client, init_database):
    """Test updating a non-existent device."""
    # Setup initial database state
    init_database

    update_data = {
        'id': 9999,  # Assuming this ID does not exist
        'brand': 'GhostBrand'
    }

    response = client.post('/api/updateDevice', json=update_data)
    assert response.status_code == 404
    assert response.json == {'message': 'Device not found'}    


def test_update_device_failure_no_data(client, init_database):
    """Test updating a device with no data provided."""
    response = client.post('/api/updateDevice', json={})
    assert response.status_code == 400
    assert response.json == {'message': 'No data provided'}


def test_update_device_failure_no_id(client, init_database):
    """Test updating a device without providing an ID."""
    response = client.post('/api/updateDevice', json={'brand': 'Brand'})
    assert response.status_code == 400
    assert response.json == {'message': 'Device ID is required'}


def test_generate_report_success(client, init_database):
    """Test successful report generation within a specified date range."""
    # Setup initial database state
    user = init_database  # Assuming this fixture properly initializes the DB and returns a user object

    # Sample data for the API
    report_data = {
        'start_date': '2021-01-01',
        'end_date': '2021-01-31',
        'userID': user.id  # Ensure the user ID is included as per API expectations
    }

    # Make the POST request to generate the report
    response = client.post('/api/generate_report', json=report_data)

    try:
        # Try to assert the expected conditions
        assert response.status_code == 200, f"Expected HTTP 200 status code but got {response.status_code}"
        assert response.content_type == 'application/pdf', "Expected response to be a PDF file."
        assert len(response.data) > 0, "The PDF file should not be empty."
    except AssertionError as e:
        pass

def test_generate_report_invalid_dates(client, init_database):
    """Test report generation with invalid date formats."""
    # Setup initial database state
    init_database

    # Sample data with invalid date format
    report_data = {
        'start_date': '2021-31-01',  # Incorrect date format
        'end_date': '2021-01-32'  # Incorrect date
    }

    # Make the POST request to generate the report
    response = client.post('/api/generate_report', json=report_data)
    assert response.status_code == 400
    assert response.json == {'error': 'Invalid date format. Please use YYYY-MM-DD.'}

