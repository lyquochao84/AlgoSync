// OTP Verification
const otpMap = new Map<string, { code: string; expiresAt: number }>();

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const storeOTP = (email: string, code: string) => {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
  otpMap.set(email, { code, expiresAt });
};

export const verifyStoredOTP = (email: string, inputCode: string): "valid" | "invalid" | "expired" => {
  const record = otpMap.get(email);
  if (!record) return "invalid";

  const { code, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpMap.delete(email);
    return "expired";
  }

  if (code !== inputCode) return "invalid";

  otpMap.delete(email);
  return "valid";
};
