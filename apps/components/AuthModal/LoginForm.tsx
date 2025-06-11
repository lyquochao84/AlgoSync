import React, { useState } from "react";

import styles from "./AuthModal.module.css";

import { LogInFormProps } from "./AuthModal.types";

const LogInForm: React.FC<LogInFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Log in with", email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className={styles.submit_button}>
        Sync In
      </button>

      <div className={styles.sync_in_wrapper}>
        <p className={styles.toggle_text}>Forgot your password?</p>
        <a className={styles.toggle_link} onClick={onForgotPassword}>
          Click Here
        </a>
      </div>
    </form>
  );
};

export default LogInForm;
