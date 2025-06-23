import React, { useState } from "react";

import styles from "./AuthModal.module.css";

import { LogInFormProps } from "@/types/AuthModal/AuthModal";

import toast from "react-hot-toast";

const LogInForm: React.FC<LogInFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/log-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // To send cookies
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Sync in failed", {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        });
        setLoading(false);
        return;
      }

      if (data.isOnboarded == false) {
        setTimeout(() => {
          window.location.replace("/onboarding");
        }, 1000);
      } else {
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1500);
      }
    } catch (err) {
      toast.error("Network error", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {loading ? (
        <button
          type="submit"
          className={styles.loading_button}
          disabled={loading}
        >
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          className={styles.submit_button}
          disabled={loading}
        >
          Sync In
        </button>
      )}
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
