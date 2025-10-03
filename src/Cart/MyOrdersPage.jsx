import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyOrdersPage.module.css";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const userOrdersKey = `orders_${user.username}`;
    const storedOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    setOrders(storedOrders);
  }, [navigate]);

  if (orders.length === 0) {
    return (
      <div className={styles.emptyOrders}>
        <h2>No orders found</h2>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <h1>My Orders</h1>

      {orders
        .slice()
        .reverse() // show latest first
        .map((order, index) => (
          <div key={index} className={styles.orderCard}>
            <h2>Order #{index + 1}</h2>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Delivery Estimate:</strong> {order.deliveryDate}</p>
            <p><strong>Payment:</strong> {order.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe"}</p>
            <p><strong>Address:</strong> {order.address}</p>

            <div className={styles.cartItems}>
              {order.cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.thumbnail} alt={item.title} className={styles.productImage} />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <p><strong>Grand Total:</strong> ₹{order.billing.grandTotal.toFixed(2)}</p>
          </div>
        ))}
    </div>
  );
};

export default MyOrdersPage;
