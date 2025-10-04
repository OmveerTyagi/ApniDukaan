import React, { useEffect, useState, useRef } from "react";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/CartSlice/authSlice";
import { toast } from "react-toastify";
import Logo from "../assets/Images/logo.png";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.itemCount);
  const user = useSelector((state) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Refs for detecting outside clicks
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleSignOut = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success("Logged out Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>Apni Dukaan</span>
      </div>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks}>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/products"}>Products</Link></li>
        <li><Link to={"/about"}>About</Link></li>
        <li><Link to={"/contact"}>Contact</Link></li>
      </ul>

      <div className={styles.rightSection}>
        {/* Cart Icon */}
        <div className={styles.cartContainer}>
          <Link to={"/cart"} className={styles.cartBtn}>
            🛒
            <span className={styles.cartCount}>{cartCount}</span>
          </Link>
        </div>

        {/* Desktop User */}
        <div className={styles.desktopUser}>
          {user ? (
            <div className={styles.userDropdown}>
              <button
                className={styles.userBtn}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.firstName.charAt(0).toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>Profile</button>
                  <button onClick={() => { navigate("/orders"); setDropdownOpen(false); }}>Orders</button>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger Menu */}
        <div
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          ref={hamburgerRef}
        >
          {!mobileMenuOpen ? (
            <>
              <span />
              <span />
              <span />
            </>
          ) : (
            "❌"
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        ref={menuRef}
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileActive : ""}`}
      >
        <li><Link to={"/"} onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
        <li><Link to={"/products"} onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
        <li><Link to={"/about"} onClick={() => setMobileMenuOpen(false)}>About</Link></li>
        <li><Link to={"/contact"} onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>

        {user ? (
          <>
            <li><button onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}>Profile</button></li>
            <li><button onClick={() => { navigate("/orders"); setMobileMenuOpen(false); }}>Orders</button></li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </>
        ) : (
          <li><button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}>Login</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
