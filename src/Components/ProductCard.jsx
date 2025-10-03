import React from "react";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice/cartSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rating, price, description, title, thumbnail, id } = product;

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to the cart");
  };

  const handleBuyProduct = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleNavigateDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.card}>
      <img
        src={thumbnail}
        alt={title}
        className={styles.image}
        onClick={handleNavigateDetails}
        style={{ cursor: "pointer" }}
      />

      <div className={styles.content}>
        <h2 className={styles.title} onClick={handleNavigateDetails} style={{ cursor: "pointer" }}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.priceRating}>
          <span className={styles.price}>${price}</span>
          <div className={styles.rating}>
            Rating: {rating}
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.star} viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.23L12 18.897l-7.416 4.603L6 15.27 0 9.423l8.332-1.268z" />
            </svg>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.addToCart} onClick={() => handleAddProduct(product)}>Add to Cart</button>
          <button className={styles.buyNow} onClick={() => handleBuyProduct(product)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
