import React from "react";

import styles from "./ResetPassword.module.css";

const ResetPasswordModal: React.FC = () => {
  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Reset Password</h2>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.submit_button}>
              Send Reset Link
            </button>
          </form>
        </div>
    </div>
  );
};

export default ResetPasswordModal;
