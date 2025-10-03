import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSuccessPage.module.css";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("latestOrder"));

  if (!order) {
    return (
      <div className={styles.emptyOrder}>
        <h2>No order found</h2>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className={styles.successPage}>
      <h1>✅ Order Placed Successfully!</h1>

      <div className={styles.section}>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {order.user.firstName} {order.user.lastName}</p>
        <p><strong>Email:</strong> {order.user.email}</p>
      </div>

      <div className={styles.section}>
        <h2>Delivery Address</h2>
        <p>{order.address}</p>
      </div>

      <div className={styles.section}>
        <h2>Cart Items</h2>
        {order.cartItems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            {item.title} - ₹{item.price} x {item.quantity}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Billing Summary</h2>
        <p>Subtotal: ₹{order.billing.subtotal.toFixed(2)}</p>
        <p>Delivery: {order.billing.delivery === 0 ? "FREE" : `₹${order.billing.delivery}`}</p>
        <p>Handling Fee: ₹{order.billing.handling}</p>
        <strong>Grand Total: ₹{order.billing.grandTotal.toFixed(2)}</strong>
      </div>

      <div className={styles.section}>
        <h2>Payment Method</h2>
        <p>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe"}</p>
      </div>

      <p className={styles.thankYou}>Thank you for shopping with us! 🎉</p>

      <button className={styles.shopMoreBtn} onClick={() => navigate("/products")}>
        Shop More
      </button>
      <button className={styles.shopMoreBtn} onClick={() => navigate("/orders")}>
        See All Orders
      </button>
    </div>
  );
};

export default OrderSuccessPage;
