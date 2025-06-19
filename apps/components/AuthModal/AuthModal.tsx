import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import styles from "./AuthModal.module.css";

import { AuthModalProps } from "@/types/AuthModal/AuthModal";

import LogInForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OTPModal from "../OTPModal/OTPModal";

const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  defaultMode = "login",
}) => {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] =
    useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const router: AppRouterInstance = useRouter();

  const toggleMode = () => setIsSignUp((prev) => !prev);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      router.push("/reset-password");
    }, 300);
  };

  // Close on ESC
  useEffect(() => {
    if (showVerificationModal) return;

    const esc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [showVerificationModal]);

  // Click outside to close
  useEffect(() => {
    if (showVerificationModal) return;

    const clickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [showVerificationModal]);

  return (
    <>
      {showVerificationModal ? (
        <OTPModal
          registerEmail={registerEmail}
          registerPassword={registerPassword}
        />
      ) : (
        <div
          className={`${styles.overlay} ${
            isClosing ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <div ref={modalRef} className={styles.modal}>
            <button className={styles.close_button} onClick={onClose}>
              &times;
            </button>

            <h2 className={styles.title}>
              {isSignUp ? "Register" : "Sync In"}
            </h2>

            {isSignUp ? (
              <RegisterForm
                onRegistered={() => setShowVerificationModal(true)}
                registerEmail={registerEmail}
                registerPassword={registerPassword}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
              />
            ) : (
              <LogInForm onForgotPassword={handleCloseModal} />
            )}

            <div className={styles.register_wrapper}>
              <p className={styles.toggle_text}>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <span className={styles.toggle_link} onClick={toggleMode}>
                {isSignUp ? "Sync In" : "Sign Up"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
