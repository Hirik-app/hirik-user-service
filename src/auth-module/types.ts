export interface LoginWithPhoneRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface LoginWithPhoneResponse {
  success: boolean;
  message: string;
  userId?: string;
  isNewUser?: boolean;
  otpSent?: boolean;
}

export interface OTPData {
  otp: string;
  expiresAt: Date;
  attempts: number;
  userId: string;
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  countryCode: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    phoneNumber: string;
    countryCode: string;
    createdAt: Date;
  };
}