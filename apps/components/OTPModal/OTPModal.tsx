import React, { useRef, useState } from "react";

import styles from "./OTPModal.module.css";

import { OTPModalProps } from "@/types/OTPModal/OTPModal";

const OTPModal: React.FC<OTPModalProps> = ({
  registerEmail,
  registerPassword,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpMessage, setOTPMessage] = useState<string>("");
  const [resendMessage, setResendMessage] = useState<string>("");
  const [resendSuccessfully, setResendSuccessfully] = useState<boolean | null>(
    null
  );
  const [otpSuccess, setOTPSuccess] = useState<boolean | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return; // Only allow digits or empty string

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend code API call
  const handleResendCode = async () => {
    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: registerEmail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResendMessage(data.message);
        setResendSuccessfully(true);
      } 
      else {
        setResendMessage(data.message || "Failed to resend the code");
        setResendSuccessfully(false);
      }
    } 
    catch (error) {
      alert("Network error. Please try again.");
    }
  };

  // Submit the code
  const handleSubmit = async () => {
    const verificationCode = otp.join("");

    if (verificationCode.length !== 6) {
      setOTPMessage("Please enter all 6 digits");
      setOTPSuccess(false);
      return;
    }

    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/register-verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
            verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOTPMessage(data.message);
        setOTPSuccess(true);

        // Loading delay
        setTimeout(() => {
          window.location.replace("/onboarding");
        }, 1000); // Delay for 1.5s
      } 
      else {
        setOTPMessage(data.message || "Verification failed! Please try again");
        setOTPSuccess(false);
      }
    } 
    catch (error) {
      setOTPMessage("Network error. Please try again");
      setOTPSuccess(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Verify Your Email</h2>
        <p className={styles.description}>
          Enter the 6-digit code we sent to <br />
          <strong className={styles.truncatedEmail} data-full={registerEmail}>
            {registerEmail}
          </strong>
        </p>

        <div className={styles.otpContainer}>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={styles.otpInput}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className={styles.verifyButton_wrapper}>
          <button className={styles.verifyButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className={styles.resendText}>
          Didn’t receive the code?
          <span className={styles.resendLink} onClick={handleResendCode}>
            Resend
          </span>
        </div>
        {otpMessage && (
          <p
            className={
              otpSuccess
                ? `${styles.resend_text} ${styles.success}`
                : `${styles.resend_text} ${styles.error}`
            }
          >
            {otpMessage}
          </p>
        )}
        {resendMessage && (
          <p
            className={
              resendSuccessfully
                ? `${styles.resend_text} ${styles.success}`
                : `${styles.resend_text} ${styles.error}`
            }
          >
            {resendMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPModal;
