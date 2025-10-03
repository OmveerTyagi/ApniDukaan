import React from "react";
import styles from "./RecentProductCard.module.css";

const RecentProductCard = ({ product }) => {
  return (
    <div className={styles.recentCard}>
      <img src={product.thumbnail || product.images[0]} alt={product.title} />
      <div className={styles.info}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default RecentProductCard;
