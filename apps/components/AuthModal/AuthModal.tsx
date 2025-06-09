import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import styles from "./AuthModal.module.css";
import { FaGithub } from "react-icons/fa";

import { AuthModalProps } from "./AuthModal.types";

const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  defaultMode = "login",
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(defaultMode === "signup");
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const router: AppRouterInstance = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Change between Register modal and Sign In modal
  const toggleMode: () => void = () => {
    setIsSignUp((prev) => !prev);
  };

  // Fade animation for closing the modal
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the modal when navigated to '/reset-password'
  const handleCloseModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      router.push("/reset-password");
    }, 300);
  };

  // Validate Sign Up Form
  const validateForm = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    // Password match check (only if in Sign Up mode)
    if (isSignUp && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  return (
    <div
      className={`${styles.overlay} ${
        isClosing ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>{isSignUp ? "Register" : "Sync In"}</h2>
        <>
          {!isSignUp ? (
            <>
              <button className={styles.github_button}>
                <FaGithub className={styles.github_icon} />
                Continue with GitHub
              </button>

              <div className={styles.divider}>
                <span>or</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </>

        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            console.log("Form is valid");
          }
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {isSignUp && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </>
          )}
          <button type="submit" className={styles.submit_button}>
            {isSignUp ? "Start Your Journey" : "Sync In"}
          </button>
        </form>

        {!isSignUp ? (
          <div>
            <div className={styles.register_wrapper}>
              <p className={styles.toggle_text}>Forgot your password?</p>
              <a className={styles.toggle_link} onClick={handleCloseModal}>
                Click Here
              </a>
            </div>
            <div className={styles.register_wrapper}>
              <p className={styles.toggle_text}>Don't have an account?</p>
              <span className={styles.toggle_link} onClick={toggleMode}>
                Sign Up
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.sync_in_wrapper}>
            <p className={styles.toggle_text}>Already have an account?</p>
            <span className={styles.toggle_link} onClick={toggleMode}>
              Sync In
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
