import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exchangeRate = 83.2;

 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(data);

        // Save to recently viewed
        const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
        const updated = [data, ...stored.filter(p => p.id !== data.id)].slice(0, 5);
        localStorage.setItem("recentProducts", JSON.stringify(updated));
        setRecentProducts(updated);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity };
    dispatch(addToCart(productWithQuantity));
    toast.success(`${quantity} item(s) added to cart`);
  };

  if (!product) return <div className={styles.loader}>Loading...</div>;

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.cardWrapper}>
        {/* Main Product Card */}
        <div className={styles.productCard}>
          <img src={product.thumbnail} alt={product.title} className={styles.productImage} />

          <div className={styles.productInfo}>
            <h1>{product.title}</h1>
            <p className={styles.brand}>Brand: {product.brand}</p>
            <p className={styles.category}>Category: {product.category}</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.priceSection}>
              <span className={styles.discountedPrice}>₹{discountedPrice* exchangeRate.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className={styles.originalPrice}>₹{product.price* exchangeRate.toFixed(2)}</span>
                  <span className={styles.discount}>-{product.discountPercentage}%</span>
                </>
              )}
            </div>

            <p className={styles.rating}>Rating: {product.rating} ⭐</p>
            <p className={styles.stock}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </p>
            <p className={styles.delivery}>Estimated Delivery: 3-7 days</p>

            {/* Quantity Selector */}
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
            </div>

            {/* Buttons */}
            <div className={styles.buttons}>
              <button onClick={() => handleAddToCart(product)} className={styles.addToCart}>
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart(product);
                  navigate("/cart");
                }}
                className={styles.buyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        
            </div>
      
      </div>
  
  );
};

export default ProductDetails;
