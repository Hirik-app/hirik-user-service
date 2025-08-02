export interface ResumeInput {
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType: string;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface ResumeUpdateInput {
  title?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface ResumeResponse {
  id: string;
  profileId: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType: string;
  isDefault: boolean;
  isActive: boolean;
  uploadedAt: string;
  updatedAt: string;
}