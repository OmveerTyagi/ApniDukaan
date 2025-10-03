import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css"; 
import ProductCard from "../../Components/ProductCard";
import RecentProductCard from "../../Components/RecentProductCard"; // import new card
import Footer from "../../Components/Fotter";
import Image from "../../assets/Images/Grocery.jpg"
import { Link } from "react-router";
import { PropagateLoader } from "react-spinners";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const FetchProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    setProducts(data.products);
  };

  useEffect(() => {
    FetchProducts();

    // Fetch recent products from localStorage, keep latest 5
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecentProducts(stored.slice(0, 4));
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Welcome to Apni Dukaan </h1>
          <h2>Apni Dukaan – Har Zaroorat, Ek Hi Jahaan 🛍️</h2>
          <p>Find the best deals on your favorite products. Shop smart, shop easy!</p>
          <Link to={'/products'} className={styles.shopBtn}>Start Shopping</Link>
        </div>
        <div className={styles.heroImage}>
          <img src={Image} alt="Shopping banner" />
        </div>
      </div>

      {/* Featured Products */}
      <div className={styles.productsSection}>
        <h2>Featured Products</h2>
        <div className={styles.productsGrid}>
          {products.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
              <PropagateLoader color="#36d7b7" size={15} />
            </div>
          ) : (
            products.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Recently Viewed Products */}
      {recentProducts.length > 0 && (
        <div className={styles.recentProductsSection}>
          <h2>Recently Viewed Products</h2>
          <div className={styles.recentProductsGrid}>
            {recentProducts.map((product) => (
              <RecentProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
