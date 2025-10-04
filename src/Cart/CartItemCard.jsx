import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/CartSlice/cartSlice";
import styles from "./CartItemCard.module.css";
import { toast } from "react-toastify";

const CartItemCard = ({ product }) => {
  const dispatch = useDispatch();
  const exchangeRate = 83.2;

const rupees = product.price * exchangeRate;

  return (
    <div className={styles.cartItem}>
      {/* Left: Image */}
      <div className={styles.imageContainer}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
      </div>

      {/* Middle: Title, Price, Quantity */}
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>₹{rupees.toFixed(2)}</p>
        <p className={styles.quantity}>Quantity: {product.quantity}</p>
      </div>

      {/* Right: Remove Button */}
      <div className={styles.actions}>
        <button
          onClick={() => {dispatch(removeFromCart(product.id))
            toast.success("Product Successfully Removed From the Cart")
          }}
          className={styles.removeBtn}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
