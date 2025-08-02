export interface EducationResponse {
  id: string;
  profileId: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  description?: string;
  isCurrent: boolean;
}