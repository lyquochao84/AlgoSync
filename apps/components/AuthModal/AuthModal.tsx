import React, { useState, useEffect, useRef } from "react";

import styles from "./AuthModal.module.css";
import { FaGithub } from "react-icons/fa";

import { AuthModalProps } from "./AuthModal.types";

const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  defaultMode = "login",
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(defaultMode === "signup");
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
            />
          )}
          <button type="submit" className={styles.submit_button}>
            {isSignUp ? "Start Your Journey" : "Sync In"}
          </button>
        </form>

        {!isSignUp ? (
          <div>
            <div className={styles.register_wrapper}>
              <p className={styles.toggle_text}>Forgot your password?</p>
              <span className={styles.toggle_link} onClick={toggleMode}>
                Click Here
              </span>
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
