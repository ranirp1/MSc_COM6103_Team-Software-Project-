from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import func
from sqlalchemy import text
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Enum
from flask import Blueprint
import os
from dotenv import load_dotenv
import stripe
from datetime import datetime
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Paragraph, Image
from werkzeug.utils import secure_filename
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from collections import defaultdict

from enum import Enum as PyEnum
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.barcharts import VerticalBarChart
from collections import defaultdict
from flask_mail import Mail
from flask_mail import Message

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# pip install python-jose to work with JWT tokens
from jose import JWTError, jwt
from functools import wraps
from os import environ

SECRET_KEY = environ.get('JWT_SECRET_KEY', 'atyehdchjuiikkdlfueghfbvh')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345@localhost:3306/test_db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:your_password@127.0.0.0:3306/test_db'
db = SQLAlchemy(app)
CORS(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'com6103team03@gmail.com'  # Your Gmail address
app.config['MAIL_PASSWORD'] = 'nqfm kpqv dprj zfqd'  # Your Gmail password or app-specific password
sender_email = 'com6103team03@gmail.com'
mail = Mail(app)

blueprint = Blueprint('blueprint', __name__)


# put this sippet ahead of all your bluprints
# blueprint can also be app~~
@blueprint.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    # Other headers can be added here if needed
    return response


load_dotenv()
app.config['STRIPE_SECRET_KEY'] = os.getenv('STRIPE_SECRET_KEY')

UPLOAD_FOLDER = '../client/public/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

STRIPE_PUBLIC_KEY = "pk_test_51OrgFjIVN70bvUYCC4WUSwxYMeBWIQfc7A4rToYj6aDG0KzxHW1WLqvqpOycFM5ldApdqxFobn2LoiReJClOVwT400L7Q7ADBN"

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
CORS(app, origins=["http://localhost:3000"])
app.config['CORS_HEADERS'] = 'Content-Type'


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
    brand = db.Column(db.String(120), nullable=True)
    model = db.Column(db.String(120), nullable=True, unique=True)
    dateOfRelease = db.Column(db.Date, nullable=True)
    isVerified = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'deviceID': self.deviceID,
            'brand': self.brand,
            'model': self.model,
            'dateOfRelease': str(self.dateOfRelease) if self.dateOfRelease else None,
            'isVerified': self.isVerified,
        }


class _DATA_RETRIEVED(PyEnum):
    SENT = 'Sent for Processing'
    RECEIVED = 'Received for Processing'
    RETRIEVED = 'Data Retrieved'

    def __str__(self):
        return self.value


class Device_Status(PyEnum):
    DEV_REGISTERED = 'Device Registered'
    DEV_VERIF = 'Device Verified'
    PAYMENT_DONE = 'Payment Processed'  #Payment done
    DATA_RETRIEVED = _DATA_RETRIEVED
    URL_READY = 'Link Received'

    def __str__(self):
        return self.value


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
    # dataRetrievalID = db.Column(db.Integer, nullable=True)
    estimatedValue = db.Column(db.String(255))
    device_status = db.Column(Enum(Device_Status), default=Device_Status.DEV_REGISTERED)

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
            # 'dataRetrievalID': self.dataRetrievalID,
            'estimatedValue': self.estimatedValue,
            'device_status': str(self.device_status.value)
        }


class DataRetrieval(db.Model):
    __tablename__ = 'dataretrieval'
    dataRetrievalID = db.Column(db.Integer, primary_key=True)
    userDeviceId = db.Column(db.Integer, ForeignKey('user_device.userDeviceID'), nullable=False)
    userDevice = relationship('UserDevice', backref=db.backref('userDevice'))
    dataUrl = db.Column(db.String(255), nullable=True)
    dateOfCreation = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # user_device = relationship('UserDevice', backref='dataretrieval', foreign_keys=[userDeviceId])

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
    date = db.Column(db.Date, nullable=False)

    def serialize(self):
        return {
            'paymentID': self.paymentID,
            'dataRetrievalID': self.dataRetrievalID,
            'userID': self.userID,
            'date': self.date
        }


class estimateValues(db.Model):
    __tablename__ = 'estimatedvalues'
    estimatedValueID = db.Column(db.Integer, primary_key=True)
    deviceID = db.Column(db.Integer, ForeignKey('device.deviceID'), nullable=False)
    newDeviceEstimatedPrice = db.Column(db.Integer)
    usedDeviceEstimatedPrice = db.Column(db.Integer)
    damagedDeviceEstimatedPrice = db.Column(db.Integer)
    device = relationship('Device', backref='estimatedvalues', foreign_keys=[deviceID])


@classmethod
def add_estimatedprices_initial_values(cls):
    # Add initial values here
    initial_values = [
        cls(deviceID=1, newDeviceEstimatedPrice=1000, usedDeviceEstimatedPrice=500, damagedDeviceEstimatedPrice=100),
        cls(deviceID=2, newDeviceEstimatedPrice=1200, usedDeviceEstimatedPrice=600, damagedDeviceEstimatedPrice=150),
        cls(deviceID=3, newDeviceEstimatedPrice=900, usedDeviceEstimatedPrice=665, damagedDeviceEstimatedPrice=400),
        # S23 ultra
        cls(deviceID=4, newDeviceEstimatedPrice=1100, usedDeviceEstimatedPrice=900, damagedDeviceEstimatedPrice=600),
        # S24 ultra
        cls(deviceID=5, newDeviceEstimatedPrice=800, usedDeviceEstimatedPrice=665, damagedDeviceEstimatedPrice=400),
        # iPhone 15
        cls(deviceID=6, newDeviceEstimatedPrice=900, usedDeviceEstimatedPrice=700, damagedDeviceEstimatedPrice=450),
        # iPhone 15 Pro
        cls(deviceID=7, newDeviceEstimatedPrice=779, usedDeviceEstimatedPrice=449, damagedDeviceEstimatedPrice=200),
        # iPhone 13
        cls(deviceID=8, newDeviceEstimatedPrice=1049, usedDeviceEstimatedPrice=649, damagedDeviceEstimatedPrice=300),
        # iPhone 13 Pro Max
        cls(deviceID=9, newDeviceEstimatedPrice=849, usedDeviceEstimatedPrice=549, damagedDeviceEstimatedPrice=300),
        # iPhone 14
        cls(deviceID=10, newDeviceEstimatedPrice=1099, usedDeviceEstimatedPrice=699, damagedDeviceEstimatedPrice=400),
        # iPhone 14 Pro Max
        cls(deviceID=11, newDeviceEstimatedPrice=679, usedDeviceEstimatedPrice=349, damagedDeviceEstimatedPrice=150),
        # iPhone 12
        cls(deviceID=12, newDeviceEstimatedPrice=1099, usedDeviceEstimatedPrice=549, damagedDeviceEstimatedPrice=300),
        # iPhone 12 Pro Max
        cls(deviceID=13, newDeviceEstimatedPrice=299, usedDeviceEstimatedPrice=149, damagedDeviceEstimatedPrice=50),
        # OnePlus Nord
        cls(deviceID=14, newDeviceEstimatedPrice=399, usedDeviceEstimatedPrice=199, damagedDeviceEstimatedPrice=100),
        # Google Pixel
        cls(deviceID=15, newDeviceEstimatedPrice=489, usedDeviceEstimatedPrice=249, damagedDeviceEstimatedPrice=100),
        # iPhone 11
        cls(deviceID=16, newDeviceEstimatedPrice=389, usedDeviceEstimatedPrice=149, damagedDeviceEstimatedPrice=50),
        # iPhone XR
    ]

    # Add the instances to the session and commit
    for value in initial_values:
        db.session.add(value)
    db.session.commit()


# Create the tables when Flask starts up
with app.app_context():
    # Create tables
    db.create_all()

    # Dictionary to map model names to device data including release dates
    device_data = {
        "Samsung S23 Ultra": {"brand": "Samsung", "model": "S23 Ultra", "dateOfRelease": "2023-02-17"},
        "Samsung S24 Ultra": {"brand": "Samsung", "model": "S24 Ultra", "dateOfRelease": "2024-02-01"},
        "iPhone 15": {"brand": "Apple", "model": "iPhone 15", "dateOfRelease": "2023-09-01"},
        "iPhone 15 Pro": {"brand": "Apple", "model": "iPhone 15 Pro", "dateOfRelease": "2023-09-01"},
        "iPhone 13": {"brand": "Apple", "model": "iPhone 13", "dateOfRelease": "2021-09-24"},
        "iPhone 13 Pro Max": {"brand": "Apple", "model": "iPhone 13 Pro Max", "dateOfRelease": "2021-09-24"},
        "iPhone 14": {"brand": "Apple", "model": "iPhone 14", "dateOfRelease": "2022-09-16"},
        "iPhone 14 Pro Max": {"brand": "Apple", "model": "iPhone 14 Pro Max", "dateOfRelease": "2022-09-16"},
        "iPhone 12": {"brand": "Apple", "model": "iPhone 12", "dateOfRelease": "2020-10-23"},
        "iPhone 12 Pro Max": {"brand": "Apple", "model": "iPhone 12 Pro Max", "dateOfRelease": "2020-11-13"},
        "OnePlus Nord": {"brand": "OnePlus", "model": "OnePlus Nord", "dateOfRelease": "2020-07-21"},
        "Google Pixel": {"brand": "Google", "model": "Google Pixel", "dateOfRelease": "2016-10-04"},
        "iPhone 11": {"brand": "Apple", "model": "iPhone 11", "dateOfRelease": "2019-09-20"},
        "iPhone XR": {"brand": "Apple", "model": "iPhone XR", "dateOfRelease": "2018-10-26"}
    }

    # Add devices with data including release dates if they don't already exist
    for device_name, data in device_data.items():
        existing_device = Device.query.filter_by(model=data["model"]).first()
        if not existing_device:
            device = Device(
                brand=data["brand"],
                model=data["model"],
                dateOfRelease=datetime.strptime(data["dateOfRelease"], "%Y-%m-%d").date(),
                isVerified=True
            )
            db.session.add(device)

    # Add initial values only if they don't already exist
    estimateprices_initial_values = [
        estimateValues(deviceID=1, newDeviceEstimatedPrice=900, usedDeviceEstimatedPrice=665,
                       damagedDeviceEstimatedPrice=400),  # S23 ultra
        estimateValues(deviceID=2, newDeviceEstimatedPrice=1100, usedDeviceEstimatedPrice=900,
                       damagedDeviceEstimatedPrice=600),  # S24 ultra
        estimateValues(deviceID=3, newDeviceEstimatedPrice=800, usedDeviceEstimatedPrice=665,
                       damagedDeviceEstimatedPrice=400),  # iPhone 15
        estimateValues(deviceID=4, newDeviceEstimatedPrice=900, usedDeviceEstimatedPrice=700,
                       damagedDeviceEstimatedPrice=450),  # iPhone 15 Pro
        estimateValues(deviceID=5, newDeviceEstimatedPrice=779, usedDeviceEstimatedPrice=449,
                       damagedDeviceEstimatedPrice=200),  # iPhone 13
        estimateValues(deviceID=6, newDeviceEstimatedPrice=1049, usedDeviceEstimatedPrice=649,
                       damagedDeviceEstimatedPrice=300),  # iPhone 13 Pro Max
        estimateValues(deviceID=7, newDeviceEstimatedPrice=849, usedDeviceEstimatedPrice=549,
                       damagedDeviceEstimatedPrice=300),  # iPhone 14
        estimateValues(deviceID=8, newDeviceEstimatedPrice=1099, usedDeviceEstimatedPrice=699,
                       damagedDeviceEstimatedPrice=400),  # iPhone 14 Pro Max
        estimateValues(deviceID=9, newDeviceEstimatedPrice=679, usedDeviceEstimatedPrice=349,
                       damagedDeviceEstimatedPrice=150),  # iPhone 12
        estimateValues(deviceID=10, newDeviceEstimatedPrice=1099, usedDeviceEstimatedPrice=549,
                       damagedDeviceEstimatedPrice=300),  # iPhone 12 Pro Max
        estimateValues(deviceID=11, newDeviceEstimatedPrice=299, usedDeviceEstimatedPrice=149,
                       damagedDeviceEstimatedPrice=50),  # OnePlus Nord
        estimateValues(deviceID=12, newDeviceEstimatedPrice=399, usedDeviceEstimatedPrice=199,
                       damagedDeviceEstimatedPrice=100),  # Google Pixel
        estimateValues(deviceID=13, newDeviceEstimatedPrice=489, usedDeviceEstimatedPrice=249,
                       damagedDeviceEstimatedPrice=100),  # iPhone 11
        estimateValues(deviceID=14, newDeviceEstimatedPrice=389, usedDeviceEstimatedPrice=149,
                       damagedDeviceEstimatedPrice=50),  # iPhone XR
    ]

    # Add the instances to the session and commit only if they don't already exist
    for value in estimateprices_initial_values:
        existing_value = estimateValues.query.filter_by(deviceID=value.deviceID).first()
        if not existing_value:
            db.session.add(value)
    # Commit changes
    db.session.commit()


def updateDeviceStatus(user_device, newStatus):
    user_device.device_status = newStatus

    try:
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        db.session.flush()
        raise e


@app.route('/api/updateDeviceStatus', methods=['POST'])
@cross_origin()
def updateDeviceStatus_api():
    data = request.json
    userDeviceId = data.get("userDeviceId")
    newStatus = data.get("newStatus")
    statusEnum = Device_Status[newStatus]

    userDevice = UserDevice.query.filter_by(userDeviceID=userDeviceId).first()
    if not userDevice:
        return jsonify({'message': 'user device not found'}), 400

    try:
        userDevice.device_status = statusEnum
        db.session.commit()
        return jsonify({'message': 'successfully updated device status'}), 200
    except Exception as e:
        print(e)
        db.session.rollback()
        db.session.flush()
        return jsonify({'message': 'error updating device status'}), 500


def getEstimatedValue(model, condition):
    """
    Get the estimated value of a device based on the device model.
    """
    device = Device.query.filter_by(model=model).first()
    if not device:
        return "NA"

    estimated_value = estimateValues.query.filter_by(deviceID=device.deviceID).first()
    if not estimated_value:
        return "NA"

    if condition == 'new':
        return str(estimated_value.newDeviceEstimatedPrice)
    elif condition == 'used':
        return str(estimated_value.usedDeviceEstimatedPrice)
    elif condition == 'damaged':
        return str(estimated_value.damagedDeviceEstimatedPrice)
    else:
        return str(estimated_value.usedDeviceEstimatedPrice)


@app.route("/")
@cross_origin()
def check_sql_connection():
    try:
        db.session.execute(text("SELECT 1"))
        return 'Connection to MySQL is successful!'
    except Exception as e:
        return f'Error: {str(e)}'


# Function to generate JWT token for a user
def generate_token(user):
    payload = {
        'user_id': user.id,  # Use existing user.id
        'exp': datetime.utcnow() + timedelta(minutes=60)  # Token expires in 60 minutes
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


# Function to Verify JWT token
def verify_token(token):
    try:
        token = token.split()[1]  # Assuming 'Bearer token' format
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.exceptions.DecodeError:
        return None  # Token is malformed
    except jwt.exceptions.ExpiredSignatureError:
        return None  # Token has expired


def verify_jwt(inner_func):
    @wraps(inner_func)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return jsonify({'error': 'Missing authorization token'}), 401
        user_id = verify_token(token)
        if not user_id:
            return jsonify({'error': 'Invalid or expired token'}), 401
        # Add user_id to request object for further use
        request.user_id = user_id
        return inner_func(*args, **kwargs)

    return decorated_function


@app.route('/api/protected_endpoint')
@verify_jwt
def protected_endpoint():
    """
    Protected endpoint accessible only with a valid JWT token.

    Returns:
        A JSON response with user information or an error message.
    """

    # Access user ID from request object (added by verify_jwt decorator)
    user_id = request.user_id

    # Retrieve user information from database based on user_id
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Example usage: Return basic user information (modify as needed)
    user_data = {
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }
    return jsonify(user_data)


@app.route('/api/login', methods=['POST'])
@cross_origin()
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
        token = generate_token(user)
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'Invalid Credentials'}), 401


@app.route('/api/register', methods=['POST'])
@cross_origin()
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

    # Generate JWT token for the newly created user
    # token = generate_token(newUser)

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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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


# Source: https://github.com/Vuka951/tutorial-code/tree/master/react-flask-stripe/payment-and-hooks
@app.route('/api/create-payment-intent', methods=['POST'])
def pay():
    email = request.json.get('email', None)

    if not email:
        print("email is blank")
        return {'message': 'You need to send an Email!', 'error': True}, 400

    print(f"email is: {email}")

    intent = stripe.PaymentIntent.create(
        amount=500,
        currency='gbp',
        receipt_email=email
    )

    return {"client_secret": intent['client_secret']}, 200


@app.route('/api/deleteUser', methods=['POST'])
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
    staff_user = User.query.filter_by(email='rani@gmail.com').first()  # Adjust the email as per your staff user

    if not staff_user or not staff_user.isStaff:
        return jsonify({'message': 'Unauthorized access'}), 403

    # Check if the user exists
    user = User.query.filter_by(email=email).first()

    if user:
        # Retrieve the user's device for classification update
        user_device = UserDevice.query.filter_by(userID=user.id).first()

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
@cross_origin()
def createDevice():
    """
    Create device API
    If user wants to add a new device which is not already listed in the db, it will create a new device entry
    Associates the device with the user by userID
    Returns:
        A JSON response with a success message if the device is successfully created; A JSON response with an error message if the device model already exists in the database.
        A JSON response with a success message if the device is successfully associated with the user; A JSON response with an error message if any problems arrives.
    """
    userID = request.form.get('userID')
    deviceID = request.form.get('deviceID')
    brand = request.form.get('brand')
    model = request.form.get('model')
    deviceClassification = request.form.get('deviceClassification')
    deviceColor = request.form.get('deviceColor')
    deviceStorage = request.form.get('deviceStorage')
    deviceCondition = request.form.get('deviceCondition')
    qrCodeUrl = request.form.get('qrCodeUrl')
    dateOfRelease = request.form.get('dateofRelease')
    dateOfPurchase = request.form.get('dateofPurchase')
    # print("here")
    # print(data)
    dataRetieval = data.get('dataRetieval')
    duration = data.get('duration')
    estimatedValue = getEstimatedValue(model, deviceCondition)

    imageFile = request.files.get('image')
    filepath = None
    if (imageFile):
        filename = secure_filename(imageFile.filename)
        upload_folder = app.config['UPLOAD_FOLDER']
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        filepath = os.path.join(upload_folder, filename)
        imageFile.save(filepath)

    # Convert dateOfRelease to datetime object or set to None if not provided
    if dateOfRelease:
        try:
            dateOfRelease = datetime.strptime(dateOfRelease, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({'error': 'Invalid date format for dateOfRelease. Use format YYYY-MM-DD'}), 400
    else:
        dateOfRelease = None

    # Convert dateOfPurchase to datetime object or set to None if not provided
    if dateOfPurchase:
        try:
            dateOfPurchase = datetime.strptime(dateOfPurchase, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({'error': 'Invalid date format for dateOfPurchase. Use format YYYY-MM-DD'}), 400
    else:
        dateOfPurchase = None

    # Check if the device with the provided model already exists in the Device table
    existing_device = Device.query.filter_by(model=model).first()

    # Get the current date
    current_date = datetime.now().date()

    # If the device already exists, skip populating the Device table
    if existing_device:
        # Create an entry in the userDevice table
        user_device = UserDevice(
            userID=userID,
            deviceID=existing_device.deviceID,
            deviceClassification=deviceClassification,
            dateOfPurchase=dateOfPurchase,
            deviceColor=deviceColor,
            deviceStorage=deviceStorage,
            deviceCondition=deviceCondition,
            imageUrl=filepath,
            qrCodeUrl=qrCodeUrl,
            dateOfCreation=current_date.strftime("%Y-%m-%d"),
            estimatedValue=estimatedValue
        )
        try:
            db.session.add(user_device)
            db.session.commit()
            return jsonify({'message': 'Device already exists. Entry created in userDevice table only.'}), 200
        except Exception as e:
            print(e)
            db.session.rollback()
            db.session.flush()
            return jsonify({'message': 'User device creation error'}), 500

    # If the device does not exist, populate the Device table first
    else:
        try:
            newDeviceAdded = Device(
                brand=brand,
                model=model,
                dateOfRelease=dateOfRelease,
                isVerified=False
            )
            db.session.add(newDeviceAdded)
            db.session.commit()

            # Read the device ID from the database for the newly inserted device
            deviceID = newDeviceAdded.deviceID
            print('deviceID', deviceID)

            # Create an entry in the userDevice table
            newUserDeviceAdded = UserDevice(
                userID=userID,
                deviceID=deviceID,
                deviceClassification=deviceClassification,
                dateOfPurchase=dateOfPurchase,
                deviceColor=deviceColor,
                deviceStorage=deviceStorage,
                deviceCondition=deviceCondition,
                imageUrl=filepath,
                qrCodeUrl=qrCodeUrl,
                dateOfCreation=current_date.strftime("%Y-%m-%d"),
                estimatedValue=estimatedValue
            )
            db.session.add(newUserDeviceAdded)
            db.session.commit()
            return jsonify({'message': 'User Device creation successful'}), 200
        except Exception as e:
            print("error at create Device")
            print(e)
            db.session.rollback()
            db.session.flush()
            return jsonify({'message': 'Device creation error'}), 500


@app.route('/api/create-data-retrieval', methods=['POST'])
@cross_origin()
def createRetrievalData():
    data = request.json
    dataRetrieval = data.get('dataRetrieval')
    duration = 3  # data.get('duration')
    userDeviceID = data.get('userDeviceID')

    if dataRetrieval:
        print("retrieving data has been selected")
        print(f"duation: {duration}")
        newDataRetrieval = DataRetrieval(
            userDeviceId=userDeviceID,
            dataUrl="https://google.com",
            dateOfCreation=datetime.now(),
            duration=3,
            password="122"
                     """
                     userDeviceID
                     dataUrl
                     dateOfCreation
                     duration
                     password
                     """
        )

    try:
        db.session.add(newDataRetrieval)
        db.session.commit()
        return jsonify({'message': 'Data Retrieval creation successful'}), 200
    except Exception as e:
        print(e)
        db.session.rollback()
        db.session.flush()
        return jsonify({'message': 'Data Retrieval creation error'}), 500


@app.route('/api/update-data-retrieval-url', methods=['POST'])
@cross_origin()
def updateRetrievalData():
    print("here")
    data = request.json

    userDeviceID = data.get('userDeviceID')
    url = data.get('dataRetrievalUrl')

    # userDevice = UserDevice.query.filter_by(userDeviceID=userDeviceID).first()

    # if not userDevice:
    #     return jsonify({'message': 'User Device not found'}), 400

    dataRetrieval = DataRetrieval.query.filter_by(userDeviceID=userDeviceID).first()
    if not dataRetrieval:
        return jsonify({'message': 'DR with that device not found'}), 400

    dataRetrieval.dataUrl = url
    try:
        db.session.commit()
        # TODO
        # SEND EMAIL HERE
        return jsonify({'message': 'Url updated'}), 200
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        return jsonify({'message': 'Error updating url'}), 500


@app.route('/api/customer_device', methods=['POST'])
@cross_origin()
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
        # Fetch the device based on the model
        model = device_info.get('model')
        device = Device.query.filter_by(model=model).first()

        if device:
            # Assuming you have a one-to-many relationship between User and UserDeviceTable
            customer_device = UserDevice(
                userID=user.id,
                deviceID=device.deviceID,
                deviceClassification=device_info.get('device_classification'),
                dateOfPurchase=device_info.get('date_of_purchase'),
                deviceColor=device_info.get('device_color'),
                deviceStorage=device_info.get('device_storage'),
                deviceCondition=device_info.get('device_condition'),
                imageUrl=device_info.get('image_url'),
                qrCodeUrl=device_info.get('qr_code_url'),
                dateOfCreation=datetime.now(),
                estimatedValue=device_info.get('estimated_value'),
                device_status=Device_Status.DEV_REGISTERED
            )

            # Input validation: Check if essential device information is present
            if not customer_device.deviceClassification:
                return jsonify({'error': 'Incomplete device information'}), 400

            db.session.add(customer_device)
            db.session.commit()

            return jsonify({'message': 'Device information saved successfully'}), 200
        else:
            return jsonify({'error': 'Device not found'}), 404
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/api/getListOfDevices', methods=['POST'])
@cross_origin()
def getListOfDevices():
    data = request.json
    userID = data.get('userID')
    if (userID):
        userDevices = UserDevice.query.filter_by(userID=userID).join(Device,
                                                                     UserDevice.deviceID == Device.deviceID).all()
    else:
        userDevices = UserDevice.query.join(Device, UserDevice.deviceID == Device.deviceID).all()

    device_list = []
    for userDevice in userDevices:
        device = Device.query.filter_by(deviceID=userDevice.deviceID).first()
        estimatedValues = userDevice.estimatedValue
        if not estimatedValues:
            estimatedValues = getEstimatedValue(device.model, userDevice.deviceCondition)
        user = User.query.filter_by(id=userDevice.userID).first()
        device_data = {
            'id': userDevice.deviceID,
            'brand': device.brand,
            'model': device.model,
            'createdAt': userDevice.dateOfCreation.strftime("%Y-%m-%d"),
            'verified': device.isVerified,
            'image': userDevice.imageUrl,
            'storage': userDevice.deviceStorage,
            'color': userDevice.deviceColor,
            'dataRecovered': None,
            'condition': userDevice.deviceCondition,
            'classification': userDevice.deviceClassification,
            'dataRetrievalRequested': None,
            'dataRetrievalTimeLeft': '',
            'user_name': user.first_name + ' ' + user.last_name,
            'user_email': user.email,
            'user_phone': user.phoneNumber,
            'dataRetrievalTimeLeft': '',
            'device_status': str(userDevice.device_status),
            'estimatedValue': userDevice.estimatedValue
        }

        device_list.append(device_data)
    return jsonify(device_list)


@app.route('/api/changeDeviceVerification/', methods=['POST'])
@cross_origin()
def changeDeviceVerification():
    data = request.json
    deviceID = data.get('deviceID')
    isVerified = data.get('isVerified')
    device = Device.query.filter_by(deviceID=deviceID).first()
    userDevices = UserDevice.query.filter_by(deviceID=deviceID).all()
    for userDevice in userDevices:
        userDevice.device_status = Device_Status.DEV_VERIF if isVerified else Device_Status.DEV_REGISTERED
    if not device:
        return jsonify({'message': 'Device not found'}), 404
    device.isVerified = isVerified
    db.session.commit()
    return jsonify({'message': 'Device verification status updated'}), 200


@app.route('/api/updateDeviceVisibility', methods=['POST'])
@cross_origin()
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
    device_id = data.get('deviceID')
    is_visible = data.get('is_visible')

    if not email or not device_id or is_visible is None:
        return jsonify({'error': 'Invalid request data'}), 400

    # Check if the staff user is authenticated
    staff_user = User.query.filter_by(email='rani@gmail.com', isStaff=True).first()

    if not staff_user:
        return jsonify({'message': 'Unauthorized access'}), 403

    user = User.query.filter_by(email=email).first()

    if user:
        user_device = UserDevice.query.filter_by(user=user, deviceID=device_id).first()

        if user_device:
            # Update the device visibility
            user_device.visible = is_visible
            db.session.commit()
            return jsonify({'message': 'Device visibility updated successfully'}), 200
        else:
            return jsonify({'message': 'Device not found for the user'}), 404
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/api/getDeviceTypeAndEstimation', methods=['POST'])
@cross_origin()
def get_device_type():
    data = request.json
    brand = data.get('brand')
    model = data.get('model')
    dateOfPurchase = data.get('dateOfPurchase')
    # classification = data.get('classification')
    releaseDate = data.get('releaseDate')
    color = data.get('color')
    storage = data.get('storage')
    condition = data.get('condition')

    current_year = datetime.now().year
    release_year = datetime.strptime(releaseDate, "%Y-%m-%d").year
    # purchase_year = datetime.strptime(dateOfPurchase, "%Y-%m-%d").year
    device_age = current_year - release_year
    # device_age_purchase = current_year - purchase_year

    isDeviceRare = device_age > 20
    isDeviceRecycle = device_age < 10 and condition == "Damaged"

    if isDeviceRare:
        return jsonify({'type': 'Rare', 'data': ""}), 200
    elif isDeviceRecycle:
        return jsonify({'type': 'Recycle', 'data': ""}), 200
    else:
        return jsonify({'type': 'Current', 'data': ""}), 200


@app.route('/api/updateDevice', methods=['POST'])
@cross_origin()
def update_device():
    data = request.json
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    device_id = data.get('id')
    if not device_id:
        return jsonify({'message': 'Device ID is required'}), 400

    try:
        device = UserDevice.query.filter_by(deviceID=device_id).first()
        if not device:
            return jsonify({'message': 'Device not found'}), 404

        if 'storage' in data:
            setattr(device, 'deviceStorage', data['storage'])
        if 'color' in data:
            setattr(device, 'deviceColor', data['color'])
        if 'condition' in data:
            setattr(device, 'deviceCondition', data['condition'])
        if 'classification' in data:
            setattr(device, 'deviceClassification', data['classification'])
        if 'device_status' in data:
            setattr(device, 'device_status', Device_Status(data['device_status']))

        for field in ['brand', 'model', 'dateOfRelease',
                      'isVerified', 'estimatedValue']:
            if field in data:
                setattr(device, field, data[field])

        db.session.commit()
        return jsonify({'message': 'Device updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Failed to update device: {e}")
        return jsonify({'message': 'Failed to update device', 'error': str(e)}), 500


@app.route('/api/generate_report', methods=['POST'])
@cross_origin()
def generate_report():
    """
    Generate a report in PDF format for payment transactions and devices input by users within a specified date range.
    """
    data = request.json
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    user_id = data.get('userID')

    # Convert start_date and end_date strings to datetime 
    # Validate date format

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1)
    except Exception as e:
        return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400

    # Fetch payment transactions and devices input by users within the specified date range
    try:

        payments = PaymentTable.query.filter(PaymentTable.date.between(start_date, end_date)).all()
        user_devices = UserDevice.query.filter(UserDevice.dateOfCreation.between(start_date, end_date)).all()
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve data from the database.', 'details': str(e)}), 500

    # Generate PDF report
    try:
        pdf_filename = 'report.pdf'
        doc = SimpleDocTemplate(pdf_filename, pagesize=letter)
        elements = []

        # Define a style for the heading
        heading_style = ParagraphStyle(
            name='Heading1',
            fontSize=16,
            textColor='black',
            alignment=1,  # Center alignment
            spaceAfter=12  # Space after the heading
        )

        # Add a heading to the PDF report
        heading_text = "User Report"
        heading = Paragraph(heading_text, heading_style)
        elements.append(heading)

        # Add payments data to PDF
        payments_data = [['Payment ID', 'Data Retrieval ID', 'User ID', 'Date']]
        for payment in payments:
            payments_data.append(
                [payment.paymentID, payment.dataRetrievalID, payment.userID, payment.date.strftime('%Y-%m-%d')])
        payments_table = Table(payments_data)
        payments_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                                            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                                            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                                            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                                            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                                            ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
        elements.append(payments_table)
        elements.append(Spacer(3, 12))

        # Add user devices data to PDF
        devices_data = [['User Device ID', 'User ID', 'Device ID', 'Date of Creation']]
        for device in user_devices:
            devices_data.append(
                [device.userDeviceID, device.userID, device.deviceID, device.dateOfCreation.strftime('%Y-%m-%d')])
        devices_table = Table(devices_data)
        devices_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                                           ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                                           ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                                           ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
        elements.append(devices_table)
        elements.append(Spacer(3, 12))

        # Aggregate payments data by user ID
        user_payments = defaultdict(int)
        for payment in payments:
            user_payments[payment.userID] += 1

        # Extract user IDs and payment counts
        user_ids = list(user_payments.keys())
        payment_counts = list(user_payments.values())

        plt.figure(figsize=(10, 6))
        plt.bar(user_ids, payment_counts, color='skyblue')
        plt.xlabel('User ID')
        plt.ylabel('Number of Payments')
        plt.title('Number of Payments by User')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()

        # Save the bar graph as an image
        bar_graph_filename = 'bar_graph.png'
        plt.savefig(bar_graph_filename)

        # Close the plot to free memory
        plt.close()

        # Insert the image into the PDF report
        img = Image(bar_graph_filename, width=400, height=200)
        img.hAlign = 'CENTER'
        img.vAlign = 'MIDDLE'
        img.keepWithNext = True
        elements.append(img)

        # Build PDF document
        doc.build(elements)

        # Return the PDF file
        return send_file(pdf_filename, as_attachment=True)
    except Exception as e:
        return jsonify({'error': 'Failed to generate PDF report.', 'details': str(e)}), 500


@app.route('/api/send-payment-confirmation-mail', methods=['POST'])
def send_email():
    # Set up the email message
    data = request.json
    receiver_email = data.get('email', "manu1998kj@gmail.com")

    # Create the email body
    email_body = """
    Dear User,

    Thank you for your payment. 
    Best regards,
    eWaste
    """

    # Send the email using Flask-Mail
    try:
        msg = Message('Payment Confirmation', sender=sender_email, recipients=[receiver_email])
        msg.body = email_body
        mail.send(msg)
        return {'message': 'Email sent successfully!'}, 200
    except Exception as e:
        return {'message': 'Failed to send email.', 'error': str(e)}, 500


@app.route('/api/send-data-retrieval-link', methods=['POST'])
def send_email_link():
    data = request.json
    receiver_email = data.get('email', "manu1998kj@gmail.com")
    data_retrieval_link = data.get('urlLink', "https://example.com/data-retrieval")

    if not receiver_email:
        print("email is blank")
        return {'message': 'You need to send an Email!', 'error': True}, 400

    if not data_retrieval_link:
        return {'message': 'You need to send a data retrieval link!', 'error': True}, 400

    # Create the email body
    email_body = f"""
    Dear User,

    Great news! The data you requested is now ready for download. 
    You can access it using the following link:  {data_retrieval_link}
    
    If you have any trouble accessing the data, please don't hesitate to contact eWaste for assistance.

    Best regards,
    eWaste
    """

    # Send the email using Flask-Mail
    try:
        msg = Message('Your Data Retrieval Link', sender=sender_email, recipients=[receiver_email])
        msg.body = email_body
        mail.send(msg)
        print("Email sent successfully!")
        return {'message': 'Email sent successfully!', 'data_retrieval_link': data_retrieval_link}, 200
    except Exception as e:
        print("Failed to send email:", str(e))
        return {'message': 'Failed to send email.', 'error': True}, 500
