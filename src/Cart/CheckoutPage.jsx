import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import { clearCart } from "../Redux/CartSlice/cartSlice";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const DELIVERY_CHARGE = totalPrice >= 499 ? 0 : 50;
  const HANDLING_FEE = 30;
  const grandTotal = totalPrice + DELIVERY_CHARGE + HANDLING_FEE;

  // Calculate delivery date
  const getDeliveryDate = () => {
    const today = new Date();
    const minDelivery = new Date(today);
    const maxDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 5);
    maxDelivery.setDate(today.getDate() + 7);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return `${minDelivery.toLocaleDateString(undefined, options)} - ${maxDelivery.toLocaleDateString(undefined, options)}`;
  };

  const deliveryDate = getDeliveryDate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.info("Please login to continue checkout.");
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setAddress(storedUser.address || "123, Dummy Street, City, Country");
  }, [navigate]);

  const handleConfirmOrder = () => {
    if (!user) return;

    const order = {
      user,
      cartItems,
      billing: {
        subtotal: totalPrice,
        delivery: DELIVERY_CHARGE,
        handling: HANDLING_FEE,
        grandTotal,
      },
      address,
      paymentMethod,
      orderDate: new Date().toLocaleString(),
      deliveryDate,
    };

    // Save latest order for success page
    localStorage.setItem("latestOrder", JSON.stringify(order));

    // Save in user's order history
    const userOrdersKey = `orders_${user.username}`;
    const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    existingOrders.push(order);
    localStorage.setItem(userOrdersKey, JSON.stringify(existingOrders));
    dispatch(clearCart());
    toast.success("Order confirmed!");
    
    navigate("/success");
  };

  if (!user) return null;

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>

      {/* User Details */}
      <div className={styles.section}>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Delivery Address */}
      <div className={styles.section}>
        <h2>Delivery Address</h2>
        <textarea
          className={styles.addressInput}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Cart Items */}
      <div className={styles.section}>
        <h2>Cart Items</h2>
        {cartItems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            {item.title} - ₹{item.price} x {item.quantity}
          </div>
        ))}
      </div>

      {/* Billing Summary */}
      <div className={styles.section}>
        <h2>Billing Summary</h2>
        <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
        <p>Delivery: {DELIVERY_CHARGE === 0 ? "FREE" : `₹${DELIVERY_CHARGE}`}</p>
        <p>Handling Fee: ₹{HANDLING_FEE}</p>
        <strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong>
      </div>

      {/* Delivery Estimate */}
      <div className={styles.section}>
        <h2>Delivery Estimate</h2>
        <p>{deliveryDate}</p>
      </div>

      {/* Payment Method */}
      <div className={styles.section}>
        <h2>Payment Method</h2>
        <label>
          <input
            type="radio"
            name="payment"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={() => setPaymentMethod("stripe")}
          /> Stripe
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          /> Cash on Delivery
        </label>
      </div>

      <button className={styles.confirmBtn} onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
