from flask import Flask, render_template, redirect, url_for, request, jsonify
import jwt
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key' # Change this to a secure secret key

# Dummy user for demonstration purposes
dummy_user = {'username': 'example_user', 'password': 'example_password'}

# JWT expiration time (in seconds)
jwt_exp_seconds = 3600  # 1 hour

def generate_token(username):
    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(seconds=jwt_exp_seconds)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'])
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(data, *args, **kwargs)

    return decorated

def index():
    return render_template('login.html')

@app.route('/api/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username == dummy_user['username'] and password == dummy_user['password']:
        token = generate_token(username)
        return redirect(url_for('dashboard', token=token.decode('utf-8')))
    else:
        return render_template('login.html', error='Invalid credentials')

@app.route('/dashboard')
@token_required
def dashboard(current_user):
    return jsonify({'message': 'Welcome to the dashboard', 'user': current_user['username']})

if __name__ == '__main__':
    app.run(debug=True)