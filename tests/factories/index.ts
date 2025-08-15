// Main factory exports for easy importing
export * from './base-factory';
export * from './user-factory';
export * from './profile-factory';
export * from './recruiter-factory';
export * from './education-factory';
export * from './experience-factory';
export * from './preferences-factory';
export * from './resume-factory';

// Direct factory instance exports for easier testing
export { userFactory } from './user-factory';
export { profileFactory } from './profile-factory';
export { 
  recruiterProfileFactory,
  recruiterVerificationMethodsFactory 
} from './recruiter-factory';
export { educationFactory } from './education-factory';
export { experienceFactory } from './experience-factory';
export { 
  notificationPreferencesFactory,
  jobSearchPreferencesFactory 
} from './preferences-factory';
export { 
  resumeFactory,
  savedJobFactory,
  skillUserMapFactory,
  fcmTokenFactory,
  otpFactory,
  emailOtpFactory 
} from './resume-factory';

// Import factory instances
import { userFactory } from './user-factory';
import { profileFactory } from './profile-factory';
import { 
  recruiterProfileFactory,
  recruiterVerificationMethodsFactory 
} from './recruiter-factory';
import { educationFactory } from './education-factory';
import { experienceFactory } from './experience-factory';
import { 
  notificationPreferencesFactory,
  jobSearchPreferencesFactory 
} from './preferences-factory';
import { 
  resumeFactory,
  savedJobFactory,
  skillUserMapFactory,
  fcmTokenFactory,
  otpFactory,
  emailOtpFactory 
} from './resume-factory';

// Complete factory collection for easy testing
export const factories = {
  user: userFactory,
  profile: profileFactory,
  recruiterProfile: recruiterProfileFactory,
  recruiterVerificationMethods: recruiterVerificationMethodsFactory,
  education: educationFactory,
  experience: experienceFactory,
  notificationPreferences: notificationPreferencesFactory,
  jobSearchPreferences: jobSearchPreferencesFactory,
  resume: resumeFactory,
  savedJob: savedJobFactory,
  skillUserMap: skillUserMapFactory,
  fcmToken: fcmTokenFactory,
  otp: otpFactory,
  emailOtp: emailOtpFactory,
};

// Helper function to create a complete user with all related data
export async function createCompleteUser() {
  const user = await userFactory.create();
  const profile = await profileFactory.create({ userId: user.id });
  
  // Create related data
  const education = await educationFactory.createList(2, { profileId: profile.id });
  const experience = await experienceFactory.createList(3, { profileId: profile.id });
  const resume = await resumeFactory.create({ profileId: profile.id, isDefault: true });
  const skills = await skillUserMapFactory.createList(5, { profileId: profile.id });
  const savedJobs = await savedJobFactory.createList(3, { userId: user.id });
  const fcmToken = await fcmTokenFactory.create({ userId: user.id });
  const notificationPrefs = await notificationPreferencesFactory.create({ userId: user.id });
  const jobSearchPrefs = await jobSearchPreferencesFactory.create({ userId: user.id });
  
  return {
    user,
    profile,
    education,
    experience,
    resume,
    skills,
    savedJobs,
    fcmToken,
    notificationPrefs,
    jobSearchPrefs,
  };
}

// Helper function to create a complete recruiter
export async function createCompleteRecruiter() {
  const user = await userFactory.create();
  const recruiterProfile = await recruiterProfileFactory.createWith('verified', { userId: user.id });
  const verificationMethod = await recruiterVerificationMethodsFactory.createWith('email_domain');
  
  return {
    user,
    recruiterProfile: {
      ...recruiterProfile,
      recruiterVerificationMethodsId: verificationMethod.id,
    },
    verificationMethod,
  };
}

// Helper function to create test data for different scenarios
export const testScenarios = {
  async newUser() {
    return await userFactory.createWith('recent_user');
  },
  
  async experiencedCandidate() {
    const user = await userFactory.create();
    const profile = await profileFactory.createWith('experienced', { userId: user.id });
    const education = await educationFactory.createWith('masters_cs', { profileId: profile.id });
    const experience = await experienceFactory.createList(3, { profileId: profile.id });
    
    return { user, profile, education, experience };
  },
  
  async entryLevelCandidate() {
    const user = await userFactory.create();
    const profile = await profileFactory.createWith('entry_level', { userId: user.id });
    const education = await educationFactory.createWith('bachelors_cs', { profileId: profile.id });
    const experience = await experienceFactory.createWith('internship', { profileId: profile.id });
    
    return { user, profile, education, experience };
  },
  
  async verifiedRecruiter() {
    return await createCompleteRecruiter();
  },
  
  async pendingRecruiter() {
    const user = await userFactory.create();
    const recruiterProfile = await recruiterProfileFactory.createWith('pending_verification', { userId: user.id });
    
    return { user, recruiterProfile };
  },
};

export default factories;