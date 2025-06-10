"use client"

import { useEffect, useState } from "react"
import "./order-list.css"

const OrdersList = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - replace this with your actual API call
    
        setError(null)

        // Uncomment and modify this section when you want to use your actual API:
       
        const res = await fetch("http://localhost:8000/api/orders/")
        if (res.ok) {
          const data = await res.json()
          setOrders(data)
          setError(null)
        } else {
          setError("Failed to fetch orders")
          console.error("Failed to fetch orders:", res.statusText)
        }
     
      } catch (error) {
        setError("Error fetching orders")
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status.toLowerCase().replace(/\s+/g, "-")}`
    return <span className={statusClass}>{status}</span>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div className="header-content">
          <h1 className="orders-title">Orders Management</h1>
          <p className="orders-subtitle">Track and manage all your orders</p>
        </div>
        <div className="orders-stats">
          <div className="stat-card">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders found</h3>
          <p>When you receive orders, they'll appear here.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="table-row" style={{ "--delay": `${index * 0.05}s` }}>
                    <td className="order-id">#{order.id}</td>
                    <td className="customer-name">{order.customer_name}</td>
                    <td className="product-name">{order.product}</td>
                    <td className="quantity">
                      <span className="quantity-badge">{order.quantity}</span>
                    </td>
                    <td className="cost">{formatCurrency(order.product_cost)}</td>
                    <td className="email">{order.user_email}</td>
                    <td className="status">{getStatusBadge(order.status)}</td>
                    <td className="date">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersList
