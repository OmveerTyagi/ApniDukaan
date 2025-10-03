import React from "react";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.text}>
        Welcome to our store! We provide high-quality products at affordable
        prices. Our mission is to bring value to our customers through
        innovation, reliability, and excellent service.
      </p>
      <p className={styles.text}>
        We started this journey to make shopping easier and more enjoyable for
        everyone. Thank you for choosing us!
      </p>
    </div>
  );
};

export default AboutPage;
