import React, { useState } from "react";
import styles from "./AuthModal.module.css";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setApiError("");
    setSuccessMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response: Response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || "Registration failed"); // If backend sends error in JSON
      }
      else {
        setSuccessMessage("Registration successful!");
      }
    }
    catch(error) {
      setApiError("Network error. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      {emailError && <p className={styles.error}>{emailError}</p>}

      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <p className={styles.password_length}>Password must be at least 6 characters</p>
      <input
        type="password"
        placeholder="Confirm Password"
        className={styles.input}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
      />
      {passwordError && <p className={styles.error}>{passwordError}</p>}

      <button type="submit" className={styles.submit_button} disabled={isLoading}>
        {isLoading ? "Registering..." : "Start Your Journey"}
      </button>

      {apiError && <p className={styles.error}>{apiError}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default RegisterForm;
