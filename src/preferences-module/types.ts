export interface JobSearchPreferencesResponse {
  id: string;
  userId: string;
  desiredJobTypes: string;
  minSalary?: number;
  maxSalary?: number;
  salaryCurrency: string;
  salaryPeriod: string;
  desiredLocations?: string;
  isRemoteOnly: boolean;
  isWillingToRelocate: boolean;
  maxCommuteMiles?: number;
  desiredRoles: string;
  desiredSkills: string;
  yearsOfExperience?: string;
  desiredIndustries: string;
  minCompanySize?: number;
  maxCompanySize?: number;
  excludedCompanies: string;
  isSearchActive: boolean;
  lastSearchDate?: string;
  savedSearches?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferencesResponse {
  id: string;
  userId: string;
  jobMatches: boolean;
  applications: boolean;
  interviews: boolean;
  messages: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  quietHours?: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface FCMTokenResponse {
  id: string;
  userId: string;
  token: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}