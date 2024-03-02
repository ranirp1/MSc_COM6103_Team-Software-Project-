# Tech Titans (E-Waste Hub)

![Image](./image.png)

#### How to run

##### To Run Client

    cd client

    npm install

    npm run start

##### To Run Server

1.  Install flask

    ```
    pip3 install Flask

    ```

2.  create and activate python environment

    ```
    cd server

    python3 -m venv .venv

    // in windows
    .venv\Scripts\activate

    // in mac
    source .venv/bin/activate
    ```

4.  Install the requirment 
    ```
    pip3 install -r requirements.txt
    ```
3.  run the flask app

    ```
    flask run
    ```

---

#### Resource

##### Tech Documents

- React : https://react.dev/learn

- Flask : https://flask.palletsprojects.com/en/3.0.x/quickstart/

##### UI Framework and Design

- Tailwind : https://tailwindcss.com/

- Daisy UI : https://daisyui.com/

- Illustrations: https://storyset.com/search?q=waste

- Images and Icons : https://iconscout.com/

##### API Documents

- CeX API doc : https://github.com/Dionakra/webuy-api?tab=readme-ov-file#categories

- QR code generator API : https://goqr.me/api/

- Paypal Integration : https://medium.com/nerd-for-tech/integrating-paypal-sandbox-with-react-js-project-191caf0a7b53

- Stripe integration : https://docs.stripe.com/stripe-js/react?locale=en-GB

---

##### Courses

- Flask Course - Python Web Application Development : https://youtu.be/Qr4QMBUPxWo?feature=shared

- Learn Flask for Python - Full Tutorial: https://youtu.be/Z1RJmh_OqeA?feature=shared

- Tailwind (A MUST WATCH VIDEO) - https://www.youtube.com/watch?v=X6FIydgCzzY

- Flask + React integration - https://www.youtube.com/watch?v=7LNl2JlZKHA


---

# API Documentation

## Endpoints

### 1. Retrieve All Users
**Description:** Retrieve all users from the database and return them as JSON.

**URL:** `/api/getAllUsers`

**Method:** `POST`

**Example Request:**
```http
POST /api/getAllUsers
Host: api.yourdomain.com ( as of now its local host)
Content-Type: application/json
```


### 2. Update User to Staff
**Description:** Update a user's status to staff.

**URL:** `/api/updateUserToStaff`

**Method:** `POST`

**Parameters:**
- `email` (string): The email of the user to update.

**Example Request:**
```http
POST /api/updateUserToStaff
Host: api.yourdomain.com
Content-Type: application/json

{
    "email": "john@example.com"
}
```


### 3. Update User to Admin
**Description:** Update a user's role to admin.

**URL:** `/api/updateUserToAdmin`

**Method:** `POST`

**Parameters:**
- `email` (string): The email of the user to update.
