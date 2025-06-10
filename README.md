# 🧠📦 AI-Powered Order Processing System

A full-stack web application using Django REST Framework and React, powered by Cohere LLM and Celery, to manage and confirm product orders via email automation.

---

## 🚀 Tech Stack

- **Frontend**: React  
- **Backend**: Django REST Framework  
- **Email Scheduler**: Celery + IMAP  
- **AI Email Parsing**: Cohere LLM  
- **Database**: SQLite / PostgreSQL (configurable)

---

## 📦 Features

### ✅ Phase 1: Order Placement

- Order form fields:
  - Customer Name
  - Customer ID
  - Quantity
  - Product (dropdown)
  - Product Cost
  - User Email
- On submission:
  - Order is saved in the DB with status `"Order Placed"`
  - Email is sent to the warehouse with:
    - Order details
    - “Confirm Order” button (a pre-filled mailto link)

---

### 📥 Phase 2: Order Confirmation

- Celery periodically checks inbox (IMAP)
- LLM (Cohere) reads unread emails
- If email confirms an order (e.g., “Order #6 confirmed”), the corresponding order status is updated to `"Confirmed"`

---


## 🛠️ Setup Instructions

### 1. Clone the Repository


```bash
git clone https://github.com/donjoo/Order_management.git
cd Order_management

2. Backend Setup (Django)

Install dependencies

pip install -r requirements.txt

Create .env file

EMAIL_HOST_USER=yourcompanyemail@example.com
EMAIL_HOST_PASSWORD=yourpassword
COHERE_API_KEY=your_cohere_api_key

Apply migrations

python manage.py migrate

Run the development server

python manage.py runserver

3. Frontend Setup (React)

cd frontend
npm install
npm start

4. Celery & Scheduler

Start Celery worker:

celery -A backend worker --loglevel=info

Start periodic task runner:

celery -A backend beat --loglevel=info

