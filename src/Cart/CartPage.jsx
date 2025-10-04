import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItemCard from "./CartItemCard";
import { clearCart } from "../Redux/CartSlice/cartSlice";
import styles from "./CartPage.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.itemCount);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exchangeRate = 83.2;

const rupees = totalPrice* exchangeRate;

  const DELIVERY_CHARGE = totalPrice >= 499 ? 0 : 50;
  const HANDLING_FEE = 30;
  const grandTotal = rupees + DELIVERY_CHARGE + HANDLING_FEE;

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      
      navigate("/checkoutpage");
    } else {
      toast.info("Please login to continue checkout.");
      navigate("/login");
    }
  };

  if (cartCount === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCard}>
          <h2>Your Cart is Empty 🛒</h2>
          <p>Looks like you haven’t added anything yet. Shop more to fill your cart!</p>
          <button
            onClick={() => navigate("/products")}
            className={styles.shopBtn}
          >
            Shop Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.headerRow}>
        <h1>My Cart ({cartCount} items)</h1>
        <button
          onClick={() => {
            dispatch(clearCart());
            toast.success("Products successfully removed from the cart");
          }}
          className={styles.clearBtn}
        >
          Clear Cart
        </button>
      </div>

      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItemCard key={item.id} product={item} />
        ))}
      </div>

      {/* Billing Section */}
      <div className={styles.cartSummary}>
        <h2>Billing Summary</h2>
        <div className={styles.billRow}>
          <span>Subtotal:</span>
          <span>₹{rupees.toFixed(2)}</span>
        </div>
        <div className={styles.billRow}>
          <span>Delivery Charges:</span>
          <span className={DELIVERY_CHARGE === 0 ? styles.free : ""}>
            {DELIVERY_CHARGE === 0 ? "FREE" : `₹${DELIVERY_CHARGE}`}
          </span>
        </div>
        <div className={styles.billRow}>
          <span>Handling Fee:</span>
          <span>₹{HANDLING_FEE}</span>
        </div>
        <hr />
        <div className={`${styles.billRow} ${styles.grandTotal}`}>
          <strong>Grand Total:</strong>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
