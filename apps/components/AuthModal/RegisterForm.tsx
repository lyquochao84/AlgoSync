import React, { useState } from "react";

import styles from "./AuthModal.module.css";

import { RegisterFormProps } from "@/types/AuthModal/AuthModal";
import toast from "react-hot-toast";

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegistered,
  registerEmail,
  registerPassword,
  setRegisterEmail,
  setRegisterPassword,
}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isValidLength = registerPassword.length >= 6;
  const hasUpperAndLower =
    /[A-Z]/.test(registerPassword) && /[a-z]/.test(registerPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(registerPassword);

  const isPasswordValid = isValidLength && hasUpperAndLower && hasSpecialChar;

  const validate = (): boolean => {
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      toast.error("Please enter a valid email address", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
      valid = false;
    }

    if (registerPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
      valid = false;
    }

    if (registerPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
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
        toast.error(data.message || "Registration failed", {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      } else {
        toast.success(data.message, {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        });
        setTimeout(() => {
          if (onRegistered) onRegistered();
        }, 1000);
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
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
