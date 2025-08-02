export interface RecruiterProfileResponse {
  id: string;
  userId: string;
  fullName?: string;
  companyId?: string;
  jobRoleId?: string;
  workEmail?: string;
  location?: string;
  isVerified: boolean;
  recruiterVerificationMethodsId?: string;
  verifiedBy?: string;
  verificationDetails?: string;
  createdAt: string;
  updatedAt: string;
  recruiterVerificationMethods?: {
    id: string;
    method: string;
  };
}

export interface VerificationMethodResponse {
  id: string;
  method: string;
}