"use client"

import { useState } from "react"
import "./order-form.css"

// SVG Icons as components
const PackageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
    <path d="M12 3v6"></path>
  </svg>
)

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const HashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="9" y2="9"></line>
    <line x1="4" x2="20" y1="15" y2="15"></line>
    <line x1="10" x2="8" y1="3" y2="21"></line>
    <line x1="16" x2="14" y1="3" y2="21"></line>
  </svg>
)

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="2" y2="22"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
)

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="12"></line>
    <line x1="12" x2="12.01" y1="16" y2="16"></line>
  </svg>
)

const LoaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
)

function OrderForm() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_id: "",
    quantity: "",
    product: "Product A",
    product_cost: "",
    user_email: "",
  })

  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear error state when user starts typing
    if (status === "error") {
      setStatus("idle")
      setErrorMessage("")
    }
  }

  const resetForm = () => {
    setFormData({
      customer_name: "",
      customer_id: "",
      quantity: "",
      product: "Product A",
      product_cost: "",
      user_email: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("http://localhost:8000/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
        resetForm()
        // Auto-reset success state after 3 seconds
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        const errorData = await res.json().catch(() => ({}))
        setStatus("error")
        setErrorMessage(errorData.message || "Failed to place order. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  const isLoading = status === "loading"
  const isSuccess = status === "success"
  const isError = status === "error"

  if (isSuccess) {
    return (
        
      <div className="container">
        <div className="success-card">
          <div className="success-content">
            <div className="success-icon-wrapper">
              <CheckCircleIcon />
            </div>
            <div>
              <h3 className="success-title">Order Placed Successfully!</h3>
              <p className="success-message">Your order has been submitted and will be processed shortly.</p>
            </div>
            <button onClick={() => setStatus("idle")} className="button button-outline">
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (

//      <div
//     style={{
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#f9fafb",
//       padding: "1rem",
//     }}
//   >
  <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="card-title-wrapper">
            <div className="icon-wrapper">
              <PackageIcon />
            </div>
            <h2 className="card-title">Place Order</h2>
          </div>
          <p className="card-description">Fill out the form below to submit your order</p>
        </div>

        <div className="card-content">
          {isError && (
            <div className="alert alert-error">
              <AlertCircleIcon />
              <p className="alert-message">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form">
            {/* Customer Name */}
            <div className="form-group">
              <label htmlFor="customer_name" className="form-label">
                <UserIcon />
                <span>Customer Name</span>
              </label>
              <input
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            {/* Customer ID */}
            <div className="form-group">
              <label htmlFor="customer_id" className="form-label">
                <HashIcon />
                <span>Customer ID</span>
              </label>
              <input
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                placeholder="Enter customer ID"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            {/* Quantity and Product Cost Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="product_cost" className="form-label">
                  <DollarIcon />
                  <span>Cost</span>
                </label>
                <input
                  id="product_cost"
                  name="product_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.product_cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="form-group">
              <label htmlFor="product" className="form-label">
                Product
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                disabled={isLoading}
                className="form-select"
              >
                <option value="Product A">Product A</option>
                <option value="Product B">Product B</option>
              </select>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="user_email" className="form-label">
                <MailIcon />
                <span>Email Address</span>
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="button">
              {isLoading ? (
                <>
                  <LoaderIcon />
                  Placing Order...
                </>
              ) : (
                <>
                  <PackageIcon />
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default OrderForm
