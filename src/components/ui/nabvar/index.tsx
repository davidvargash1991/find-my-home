import React from "react";
import styles from "./navbar.module.scss";
import logo from "images/logo.png";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <img src={logo} height={45} width={200} alt="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
