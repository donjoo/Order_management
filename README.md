# 🧠📦 AI-Powered Order Processing System
==================================

A full-stack web application to streamline and automate product order management using AI-powered email parsing and scheduling.

This system uses an AI-powered email processing backend, where a large language model (via Cohere API) is used to interpret incoming emails and update order statuses accordingly. It replaces manual or rule-based parsing logic with AI understanding.

------------------------------------------------------------

Tech Stack
----------

- Frontend: React
- Backend: Django REST Framework
- Email Scheduler: Celery + IMAP
- AI Email Parsing: Cohere LLM
- Database: SQLite / PostgreSQL (configurable)

------------------------------------------------------------

Features
--------

Order Placement
---------------
- User-friendly order form:
    - Customer Name & ID
    - Quantity
    - Product selection
    - Product Cost
    - User Email
- Orders saved to the database with status "Order Placed"
- Automated email sent to warehouse with order details and a “Confirm Order” button

Order Confirmation
------------------
- Celery periodically checks the email inbox (IMAP)
- Cohere LLM parses unread emails for order confirmations
- Order status is updated to "Confirmed" upon detection

------------------------------------------------------------

Setup
-----

Follow these steps to get the application running locally:

1. Clone the Repository

    - git clone https://github.com/donjoo/Order_management.git
    - cd Order_management

2. Backend Setup (Django)

    - Install dependencies:

        pip install -r requirements.txt

    - Create a .env file in the project root with the following content:

      -  EMAIL_HOST_USER=yourcompanyemail@example.com
      - EMAIL_HOST_PASSWORD=yourpassword
      - COHERE_API_KEY=your_cohere_api_key

    - Apply database migrations:

        python manage.py migrate

    - Run the development server:

        python manage.py runserver

3. Frontend Setup (React)

    cd frontend
    npm install
    npm start

4. Celery & Scheduler

    - Start the Celery worker:

        celery -A backend worker --loglevel=info

    - Start the periodic task runner:

        celery -A backend beat --loglevel=info

------------------------------------------------------------

Email Automation
----------------

- Orders are confirmed via warehouse email replies.
- Cohere LLM parses and updates order status automatically.
- No manual intervention required for confirmation.

------------------------------------------------------------


Contributing
------------

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

------------------------------------------------------------

Contact
-------

For questions or support, please open an issue or contact donjorois@gmail.com .
