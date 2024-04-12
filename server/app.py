from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import func
from sqlalchemy import text
from flask_cors import CORS
from datetime import datetime


from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345@localhost:3306/test_db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:your_password@127.0.0.0:3306/test_db'
db = SQLAlchemy(app)
CORS(app)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(30), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    phoneNumber = db.Column(db.String(20), unique=False, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    isStaff = db.Column(db.Boolean, default=False)
    isAdmin = db.Column(db.Boolean, default=False)
    
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phoneNumber': self.phoneNumber,
            'isStaff': self.isStaff,
            'isAdmin': self.isAdmin
        }


class Device(db.Model):
    __tablename__ = 'device'
    deviceID = db.Column(db.Integer, primary_key=True, unique=True)
    deviceType = db.Column(db.String(120), nullable=True)
    brand = db.Column(db.String(120), nullable=True)
    model = db.Column(db.String(120), nullable=True)
    dateOfRelease = db.Column(db.Date, nullable=True)
    isVerified = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'deviceID': self.deviceID,
            'deviceType': self.deviceType,
            'brand': self.brand,
            'model': self.model,
            'dateOfRelease': str(self.dateOfRelease) if self.dateOfRelease else None,
            'isVerified': self.isVerified
        }
    
# Create the tables when Flask starts up
with app.app_context():
    db.create_all()
    
    
class UserDevice(db.Model):
    __tablename__ = 'user_device'
    userDeviceID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    deviceID = db.Column(db.Integer, ForeignKey('device.deviceID'), nullable=False)
    deviceClassification = db.Column(db.String(120), nullable=False)
    dateOfPurchase = db.Column(db.Date)
    deviceColor = db.Column(db.String(120), nullable=True)
    deviceStorage = db.Column(db.String(120), nullable=True)
    deviceCondition = db.Column(db.String(20), nullable=True)
    imageUrl = db.Column(db.String(255))
    qrCodeUrl = db.Column(db.String(255))
    dateOfCreation = db.Column(db.Date)
    dataRetrievalID = db.Column(db.Integer, nullable=True)
    estimatedValue = db.Column(db.String(255))

    # Define foreign key relationships
    user = relationship('User', backref='user_device', foreign_keys=[userID])
    device = relationship('Device', backref='user_device', foreign_keys=[deviceID])

    def serialize(self):
        return {
            'userDeviceID': self.userDeviceID,
            'userID': self.userID,
            'deviceID': self.deviceID,
            'deviceClassification': self.deviceClassification,
            'dateOfPurchase': str(self.dateOfPurchase) if self.dateOfPurchase else None,
            'deviceColor': self.deviceColor,
            'deviceStorage': self.deviceStorage,
            'deviceCondition': self.deviceCondition,
            'imageUrl': self.imageUrl,
            'qrCodeUrl': self.qrCodeUrl,
            'dateOfCreation': str(self.dateOfCreation) if self.dateOfCreation else None,
            'dataRetrievalID': self.dataRetrievalID,
            'estimatedValue': self.estimatedValue
        }

class DataRetrieval(db.Model):
    __tablename__ = 'dataretrieval'
    dataRetrievalID = db.Column(db.Integer, primary_key=True)
    dataUrl = db.Column(db.String(255), nullable=True)
    dateOfCreation = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            'dataRetrievalID': self.dataRetrievalID,
            'dataUrl': self.dataUrl,
            'dateOfCreation': str(self.dateOfCreation),
            'duration': self.duration,
            'password': self.password
        }

class PaymentTable(db.Model):
    __tablename__ = 'paymenttable'
    paymentID = db.Column(db.Integer, primary_key=True)
    dataRetrievalID = db.Column(db.Integer, db.ForeignKey('dataretrieval.dataRetrievalID'), nullable=False)
    userID = db.Column(db.Integer, nullable=False)

     def serialize(self):
        return {
            'paymentID': self.paymentID,
            'dataRetrievalID': self.dataRetrievalID,
            'userID': self.userID
        }

    
# Create the tables when Flask starts up
with app.app_context():
    db.create_all()

@app.route("/")
def check_sql_connection():
    try:
        db.session.execute(text("SELECT 1"))
        return 'Connection to MySQL is successful!'
    except Exception as e:
        return f'Error: {str(e)}'


@app.route('/api/login', methods=['POST'])
def login():
    """
    Login implementation. Compares the user supplied credentials with the database entries for authentication.

    Returns:
        A JSON response depending on the correct or invalid credentials.
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'Invalid Credentials'}), 401


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email').lower()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phoneNumber = data.get('phoneNumber')
    password = data.get('password')
    acceptedTerms = data.get('terms')

    # check for blank rows
    if email == "" or first_name == "" or last_name == "" or phoneNumber == "" or password == "":
        return jsonify({'message': 'Blank Data!'}), 409

    # check for users who already exist
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User with this email already exists'}), 409

    # ensure user has accepted t&c's
    if not acceptedTerms:
        return jsonify({'message': 'You have not accepted Terms and Conditions'}), 409

    # create the new user
    newUser = User(
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password,
        phoneNumber=phoneNumber,
    )

    # source:
    # https://stackoverflow.com/a/16336401/11449502
    try:
        db.session.add(newUser)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        # code from https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        return jsonify({'message': 'Database Error'}), 500
    return jsonify({'message': 'Login Successful'}), 200


@app.route('/api/getAllUsers', methods=['GET']) 
def getAllUsers():
    """
    Retrieve all users from the database and return them as JSON.
    The role is determined based on the isAdmin and isStaff flags:
    - isAdmin: True -> 'admin'
    - isStaff: True -> 'employee'
    - Neither: -> 'endUser'
    """
    users = User.query.all()
    user_data = [
        {
            'id': user.id,
            'name': f"{user.first_name} {user.last_name}",
            'email': user.email,
            'phone': user.phoneNumber,
            'role': 'admin' if user.isAdmin else ('employee' if user.isStaff else 'endUser')
        } for user in users
    ]
    return jsonify(user_data)


@app.route('/api/updateUserToStaff', methods=['POST'])
def updateUserToStaff():
    """
    Update a user's status to staff.

    Returns:
        A JSON response with a success message if the user is found and updated successfully.
        A JSON response with an error message and status code 404 if the user is not found.
    """
    data = request.json
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.isStaff = True
    db.session.commit()
    return jsonify({'message': 'User updated to staff'}), 200


@app.route('/api/updateUserToAdmin', methods=['POST'])
def updateUserToAdmin():
    """
    Update a user's role to admin.
    Args:
        email (str): The email of the user to update.
    Returns:
        A JSON response with a success message if the user is successfully updated to admin.
        A JSON response with an error message if the user is not found in the database.
    """
    data = request.json
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.isAdmin = True
    db.session.commit()
    return jsonify({'message': 'User updated to admin'}), 200


@app.route('/api/deleteUser', methods=['POST'])
def deleteUser():
    """
    Delete a user from the database.
    Args:
        email (str): The email of the user to delete.
    Returns:
        A JSON response with a success message if the user is successfully deleted.
        A JSON response with an error message if the user is not found in the database.
    """
    # TODO : Add a check to see if the user calling this api is an admin before deleting
    data = request.json
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


@app.route('/api/downgradeToUser', methods=['POST'])
def updateUserToEndUser():
    data = request.json
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.isAdmin = False
    user.isStaff = False
    db.session.commit()
    return jsonify({'message': 'User downgraded to end user'}), 200


@app.route('/api/moveDeviceClassification', methods=['POST'])
def move_device_classification():
    """
    Move device classification for a user by staff.

    Returns:
        A JSON response with a success message if the classification is moved successfully.
        A JSON response with an error message if the user, device, or new classification is not found.
    """
    data = request.json

    # Input Validation
    email = data.get('email')
    new_classification = data.get('new_classification')

    # Check for missing data in the request
    if not email or not new_classification:
        return jsonify({'error': 'Invalid request data'}), 400

    # Check if the staff user is authenticated
    staff_user = User.query.filter_by(email='staff@example.com').first()  # Adjust the email as per your staff user

    if not staff_user or not staff_user.isStaff:
        return jsonify({'message': 'Unauthorized access'}), 403

    # Check if the user exists
    user = User.query.filter_by(email=email).first()

    if user:
        # Retrieve the user's device for classification update
        user_device = UserDevice.query.filter_by(user_id=user.id).first()

        if user_device:
            # Update the device classification
            user_device.classification = new_classification
            db.session.commit()
            return jsonify({'message': 'Classification moved successfully'}), 200
        else:
            return jsonify({'message': 'Device information not found for the user'}), 404
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/api/createDevice', methods=['POST'])
def createDevice():
    """
    Create device API
    If user wants to add a new device which is not already listed in the db, it will create a new device entry
    Associates the device with the user by userID
    Returns:
        A JSON response with a success message if the device is successfully created; A JSON response with an error message if the device model already exists in the database.
        A JSON response with a success message if the device is successfully associated with the user; A JSON response with an error message if any problems arrives.
    """
    data = request.json
    userID = data.get('userID')
    deviceType = data.get('deviceType')
    deviceID = data.get('deviceID')
    brand = data.get('brand')
    model = data.get('model')
    deviceClassification = data.get('deviceClassification')
    deviceColor = data.get('deviceColor')
    deviceStorage = data.get('deviceStorage')
    deviceCondition = data.get('deviceCondition')
    imageUrl = data.get('imageUrl')
    qrCodeUrl = data.get('qrCodeUrl')
    dateOfRelease = data.get('dateofRelease')
    dateOfPurchase = data.get('dateofPurchase')

    """Need to finalize if the isVerified is added in the device or userDevice table"""
    if not all([dateOfPurchase, imageUrl]):
        isVerified = False
    else:
        isVerified = True

    
    if(deviceID is None):
        try:
            newDeviceAdded = Device(
                deviceType=deviceType,
                brand=brand,
                model=model,
                dateOfRelease=dateOfRelease,
                isVerified=False            
            )
            db.session.add(newDeviceAdded)
            db.session.commit()
            
            # Read the device ID from the database for the newly inserted device

            deviceID = newDeviceAdded.deviceID
            print('deviceID',deviceID)
        except Exception as e:
            print(e)
            db.session.rollback()
            db.session.flush()
            return jsonify({'message': 'Device creation error'}), 500
    
    
    newUserDeviceAdded = UserDevice(
        userID = userID,
        deviceID = deviceID,
        deviceClassification = deviceClassification,
        dateOfPurchase = dateOfPurchase,
        deviceColor = deviceColor,
        deviceStorage = deviceStorage,
        deviceCondition = deviceCondition,
        imageUrl = imageUrl,
        qrCodeUrl = qrCodeUrl,
        dateOfCreation = dateOfRelease,
        dataRetrievalID = 0,
        estimatedValue = ""
    )
    try:
        db.session.add(newUserDeviceAdded)
        db.session.commit()
        return jsonify({'message': 'User Device creation successful'}), 200
    except Exception as e:
        print(e)
        db.session.rollback()
        db.session.flush()
        return jsonify({'message': 'User device creation error'}), 500


@app.route('/api/customer_device', methods=['POST'])
def create_customer_device():
    """
        Create and Save device information for a user.

        Returns:
            A JSON response with a success message if the device information is saved successfully.
            A JSON response with an error message if the user is not found.
        """
    data = request.json
    email = data.get('email')
    device_info = data.get('device_info')

    # Input validation: Check if email and device_info are present
    if not email or not device_info:
        return jsonify({'error': 'Invalid request data'}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        # Assuming you have a one-to-many relationship between User and UserDeviceTable
        customer_device = UserDevice(
            user_id=user.id,
            device_type=device_info.get('device_type'),
            brand=device_info.get('brand'),
            model=device_info.get('model'),
        )

        # Input validation: Check if essential device information is present
        if not customer_device.device_type or not customer_device.brand or not customer_device.model:
            return jsonify({'error': 'Incomplete device information'}), 400

        db.session.add(customer_device)
        db.session.commit()

        return jsonify({'message': 'Device information saved successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/api/getListOfDevices', methods=['GET'])
def getListOfDevices():
    # combine the device and UserDevice tables to get the list of devices
    print('inside get list of devices')
    userDevice = UserDevice.query.join(Device, UserDevice.deviceID == Device.deviceID).all()
    
    device_list = []
    for userDevice in userDevice:
        device = Device.query.filter_by(deviceID=userDevice.deviceID).first()
        device_data = {
            'id': userDevice.deviceID,
            'brand': device.brand,
            'model': device.model,
            'createdAt': userDevice.dateOfCreation.strftime("%Y-%m-%d"),
            'verified': device.isVerified,
            'image': '',
            'storage': userDevice.deviceStorage,
            'color': userDevice.deviceColor,
            'dataRecovered': None,
            'condition': userDevice.deviceCondition,
            'classification': userDevice.deviceClassification,
            'dataRetrievalRequested': None,
            'dataRetrievalTimeLeft': ''
        }

    device_list.append(device_data)
    return jsonify(device_list)


@app.route('/api/changeDeviceVerification/', methods=['POST'])
def changeDeviceVerification():
    data = request.json
    deviceID = data.get('deviceID')
    isVerified = data.get('isVerified')
    device = Device.query.filter_by(deviceID=deviceID).first()
    if not device:
        return jsonify({'message': 'Device not found'}), 404
    device.isVerified = isVerified
    db.session.commit()
    return jsonify({'message': 'Device verification status updated'}), 200


@app.route('/api/updateDeviceVisibility', methods=['POST'])
def update_device_visibility():
    """
    Update device visibility for a user by staff
    Returns:
    A JSON response with a success message if the visibility is updated successfully.
    A JSON response with an error message if the user or device is not found.
    """
    data = request.json

    # Input Validation
    email = data.get('email')
    device_id = data.get('device_id')
    is_visible = data.get('is_visible')

    if not email or not device_id or is_visible is None:
        return jsonify({'error': 'Invalid request data'}), 400

    # Check if the staff user is authenticated
    staff_user = User.query.filter_by(email='staff@example.com',
                                       isStaff=True).first()  # Adjust the email as per your staff user

    if not staff_user:
        return jsonify({'message': 'Unauthorized access'}), 403

    user = User.query.filter_by(email=email).first()

    if user:
        user_device = UserDeviceTable.query.filter_by(user_id=user.id, device_id=device_id).first()

        if user_device:
            # Update the device visibility
            user_device.visible = is_visible
            db.session.commit()
            return jsonify({'message': 'Device visibility updated successfully'}), 200
        else:
            return jsonify({'message': 'Device not found for the user'}), 404
    else:
        return jsonify({'message': 'User not found'}), 404
