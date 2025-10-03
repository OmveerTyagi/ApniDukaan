import React from "react";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact Us</h1>
      <form className={styles.form}>
        <label className={styles.label}>
          Name
          <input type="text" className={styles.input} placeholder="Enter your name" />
        </label>

        <label className={styles.label}>
          Email
          <input type="email" className={styles.input} placeholder="Enter your email" />
        </label>

        <label className={styles.label}>
          Message
          <textarea className={styles.textarea} placeholder="Your message..."></textarea>
        </label>

        <button type="submit" className={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
