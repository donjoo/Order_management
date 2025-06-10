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

