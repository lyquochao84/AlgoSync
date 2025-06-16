import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { RegisterFormProps } from "./AuthModal.types";

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegistered,
  registerEmail,
  registerPassword,
  setRegisterEmail,
  setRegisterPassword,
}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidLength = registerPassword.length >= 6;
  const hasUpperAndLower =
    /[A-Z]/.test(registerPassword) && /[a-z]/.test(registerPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(registerPassword);

  const isPasswordValid = isValidLength && hasUpperAndLower && hasSpecialChar;

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setApiError("");
    setSuccessMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (registerPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }

    if (registerPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || "Registration failed"); // If backend sends error in JSON
      } else {
        setSuccessMessage(data.message);

        // simulate delay then show verification modal
        setTimeout(() => {
          if (onRegistered) onRegistered();
        }, 1000);
      }
    } catch (error) {
      setApiError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        disabled={isLoading}
      />
      {emailError && <p className={styles.error}>{emailError}</p>}
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className={styles.input}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
      />
      <ul className={styles.password_requirements}>
        <li
          className={
            isValidLength
              ? `${styles.password_length} ${styles.success_password_requirements}`
              : styles.password_length
          }
        >
          Password must be at least 6 characters
        </li>
        <li
          className={
            hasUpperAndLower
              ? `${styles.password_length} ${styles.success_password_requirements}`
              : styles.password_length
          }
        >
          Must include both uppercase and lowercase letters
        </li>
        <li
          className={
            hasSpecialChar
              ? `${styles.password_length} ${styles.success_password_requirements}`
              : styles.password_length
          }
        >
          Must include at least one special character (!@#$...)
        </li>
      </ul>
      {passwordError && <p className={styles.error}>{passwordError}</p>}
      {apiError && <p className={styles.error}>{apiError}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <button
        type="submit"
        className={`${styles.submit_button} ${
          !isPasswordValid || isLoading ? styles.disabled_button : ""
        }`}
        disabled={!isPasswordValid || isLoading}
      >
        {isLoading ? "Registering..." : "Start Your Journey"}
      </button>
    </form>
  );
};

export default RegisterForm;
