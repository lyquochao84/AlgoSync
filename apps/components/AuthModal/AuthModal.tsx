import { useState } from "react";
import styles from "./AuthModal.module.css";
import { FaGithub } from "react-icons/fa";

interface AuthModalProps {
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export default function AuthModal({ onClose, defaultMode = "login" }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");
    
  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>{isSignUp ? "Register" : "Sync In"}</h2>
        <>
          {!isSignUp ? (
            <>
              <button className={styles.githubButton}>
                <FaGithub className={styles.githubIcon} />
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
          <button type="submit" className={styles.submitButton}>
            {isSignUp ? "Start Your Journey" : "Sync In"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.toggleLink} onClick={toggleMode}>
            {isSignUp ? "Sync In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
