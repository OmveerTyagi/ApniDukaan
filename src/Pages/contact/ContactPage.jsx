import React, { useState } from "react";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  // Handle form submission
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent page reload

    // Here you could also send data to an API if needed

    // Clear the fields
    setName("");
    setEmail("");
    setMessage("");

    // Show success message
    setShow(true);

    // Optionally hide message after some time
    setTimeout(() => setShow(false), 5000); // hide after 5s
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact Us</h1>
      <form className={styles.form} onSubmit={handleSendMessage}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Message
          <textarea
            className={styles.textarea}
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>

      {show && (
        <div className={styles.messageBox}>
          <h2>✅ Message Received Successfully!</h2>
          <p>We will contact you in 2-3 working days.</p>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
