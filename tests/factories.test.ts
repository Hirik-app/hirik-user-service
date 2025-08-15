// Comprehensive tests for all test data factories
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { faker } from '@faker-js/faker';

import {
  factories,
  createCompleteUser,
  createCompleteRecruiter,
  testScenarios,
  FakeData
} from './factories';

describe('Test Data Factories', () => {
  beforeEach(() => {
    // Seed faker for consistent tests
    faker.seed(12345);
  });

  describe('Base Factory Functionality', () => {
    test('should create single instance', async () => {
      const user = await factories.user.create();
      
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.phoneNumber).toBeDefined();
      expect(user.countryCode).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    test('should create multiple instances', async () => {
      const users = await factories.user.createList(3);
      
      expect(users).toHaveLength(3);
      expect(users[0].id).not.toBe(users[1].id);
      expect(users[1].id).not.toBe(users[2].id);
    });

    test('should accept overrides', async () => {
      const customPhone = '+1234567890';
      const user = await factories.user.create({
        phoneNumber: customPhone,
        countryCode: '+1'
      });
      
      expect(user.phoneNumber).toBe(customPhone);
      expect(user.countryCode).toBe('+1');
    });

    test('should support traits', async () => {
      const usUser = await factories.user.createWith('us_user');
      expect(usUser.countryCode).toBe('+1');
      
      const ukUser = await factories.user.createWith('uk_user');
      expect(ukUser.countryCode).toBe('+44');
    });
  });

  describe('User Factory', () => {
    test('should create valid user data', async () => {
      const user = await factories.user.create();
      
      expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(user.phoneNumber).toHaveLength(10);
      expect(['+1', '+44', '+91', '+49', '+33']).toContain(user.countryCode);
    });

    test('should create users with specific country codes', async () => {
      const indiaUser = await factories.user.createWith('india_user');
      expect(indiaUser.countryCode).toBe('+91');
    });

    test('should create recent and old users', async () => {
      const recentUser = await factories.user.createWith('recent_user');
      const oldUser = await factories.user.createWith('old_user');
      
      expect(recentUser.createdAt.getTime()).toBeGreaterThan(oldUser.createdAt.getTime());
    });
  });

  describe('Profile Factory', () => {
    test('should create complete profile data', async () => {
      const profile = await factories.profile.create();
      
      expect(profile.id).toBeDefined();
      expect(profile.userId).toBeDefined();
      expect(profile.fullName).toBeDefined();
      expect(profile.email).toContain('@');
      expect(profile.bio).toBeDefined();
      expect(JSON.parse(profile.location!)).toHaveProperty('city');
      expect(profile.expectedSalary).toBeDefined();
      expect(profile.yearsOfExperience).toBeDefined();
    });

    test('should create incomplete profiles', async () => {
      const profile = await factories.profile.createWith('incomplete');
      
      expect(profile.fullName).toBeUndefined();
      expect(profile.email).toBeUndefined();
      expect(profile.bio).toBeUndefined();
    });

    test('should create role-specific profiles', async () => {
      const frontendProfile = await factories.profile.createWith('frontend_focused');
      expect(frontendProfile.jobRoleId).toBe('frontend-developer');
      expect(frontendProfile.bio).toContain('frontend');
      
      const backendProfile = await factories.profile.createWith('backend_focused');
      expect(backendProfile.jobRoleId).toBe('backend-developer');
      expect(backendProfile.bio).toContain('backend');
    });

    test('should create experience-level specific profiles', async () => {
      const experienced = await factories.profile.createWith('experienced');
      expect(['5-8 years', '8+ years']).toContain(experienced.yearsOfExperience);
      
      const entryLevel = await factories.profile.createWith('entry_level');
      expect(['0-1 years', '1-3 years']).toContain(entryLevel.yearsOfExperience);
    });
  });

  describe('Recruiter Factory', () => {
    test('should create recruiter profile data', async () => {
      const recruiter = await factories.recruiterProfile.create();
      
      expect(recruiter.id).toBeDefined();
      expect(recruiter.userId).toBeDefined();
      expect(recruiter.fullName).toBeDefined();
      expect(recruiter.workEmail).toContain('@');
      expect(typeof recruiter.isVerified).toBe('boolean');
      expect(typeof recruiter.workEmailVerified).toBe('boolean');
    });

    test('should create verified recruiters', async () => {
      const verified = await factories.recruiterProfile.createWith('verified');
      
      expect(verified.isVerified).toBe(true);
      expect(verified.workEmailVerified).toBe(true);
      expect(verified.emailVerificationToken).toBeUndefined();
      expect(verified.verifiedBy).toBeDefined();
    });

    test('should create unverified recruiters', async () => {
      const unverified = await factories.recruiterProfile.createWith('unverified');
      
      expect(unverified.isVerified).toBe(false);
      expect(unverified.workEmailVerified).toBe(false);
      expect(unverified.emailVerificationToken).toBeDefined();
    });

    test('should create role-specific recruiters', async () => {
      const hrManager = await factories.recruiterProfile.createWith('hr_manager');
      expect(hrManager.jobRoleId).toBe('hr-manager');
      
      const talentAcq = await factories.recruiterProfile.createWith('talent_acquisition');
      expect(talentAcq.jobRoleId).toBe('talent-acquisition');
    });
  });

  describe('Education Factory', () => {
    test('should create education data', async () => {
      const education = await factories.education.create();
      
      expect(education.id).toBeDefined();
      expect(education.profileId).toBeDefined();
      expect(education.degree).toBeDefined();
      expect(education.institution).toBeDefined();
      expect(education.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof education.isCurrent).toBe('boolean');
    });

    test('should create specific degree types', async () => {
      const bachelors = await factories.education.createWith('bachelors_cs');
      expect(bachelors.degree).toBe('Bachelor of Science in Computer Science');
      expect(bachelors.isCurrent).toBe(false);
      
      const phd = await factories.education.createWith('phd_current');
      expect(phd.degree).toBe('PhD in Computer Science');
      expect(phd.isCurrent).toBe(true);
      expect(phd.endDate).toBeUndefined();
    });

    test('should create bootcamp education', async () => {
      const bootcamp = await factories.education.createWith('bootcamp');
      expect(bootcamp.degree).toBe('Full Stack Web Development Certificate');
      expect(bootcamp.description).toContain('JavaScript');
    });
  });

  describe('Experience Factory', () => {
    test('should create experience data', async () => {
      const experience = await factories.experience.create();
      
      expect(experience.id).toBeDefined();
      expect(experience.profileId).toBeDefined();
      expect(experience.companyId).toBeDefined();
      expect(experience.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(experience.rolesAndResponsibilities).toContain('•');
      expect(typeof experience.isCurrent).toBe('boolean');
    });

    test('should create current and previous jobs', async () => {
      const current = await factories.experience.createWith('current_job');
      expect(current.isCurrent).toBe(true);
      expect(current.endDate).toBeUndefined();
      
      const previous = await factories.experience.createWith('previous_job');
      expect(previous.isCurrent).toBe(false);
      expect(previous.endDate).toBeDefined();
    });

    test('should create role-specific experiences', async () => {
      const senior = await factories.experience.createWith('senior_role');
      expect(['senior-software-engineer', 'tech-lead', 'engineering-manager']).toContain(senior.jobRoleId);
      expect(senior.rolesAndResponsibilities).toContain('Led');
      
      const intern = await factories.experience.createWith('internship');
      expect(intern.jobRoleId).toBe('software-engineering-intern');
    });
  });

  describe('Preferences Factories', () => {
    test('should create notification preferences', async () => {
      const prefs = await factories.notificationPreferences.create();
      
      expect(prefs.id).toBeDefined();
      expect(prefs.userId).toBeDefined();
      expect(typeof prefs.jobMatches).toBe('boolean');
      expect(typeof prefs.applications).toBe('boolean');
      expect(['immediate', 'daily', 'weekly']).toContain(prefs.frequency);
    });

    test('should create job search preferences', async () => {
      const prefs = await factories.jobSearchPreferences.create();
      
      expect(prefs.id).toBeDefined();
      expect(prefs.userId).toBeDefined();
      expect(JSON.parse(prefs.desiredJobTypes)).toBeInstanceOf(Array);
      expect(JSON.parse(prefs.desiredRoles)).toBeInstanceOf(Array);
      expect(JSON.parse(prefs.desiredSkills)).toBeInstanceOf(Array);
      expect(['USD', 'EUR', 'GBP', 'INR']).toContain(prefs.salaryCurrency);
    });

    test('should create preference variations', async () => {
      const remoteOnly = await factories.jobSearchPreferences.createWith('remote_only');
      expect(remoteOnly.isRemoteOnly).toBe(true);
      expect(remoteOnly.isWillingToRelocate).toBe(false);
      
      const highSalary = await factories.jobSearchPreferences.createWith('high_salary');
      expect(highSalary.minSalary).toBe(150000);
      expect(highSalary.maxSalary).toBe(300000);
    });
  });

  describe('Resume and Supporting Data Factories', () => {
    test('should create resume data', async () => {
      const resume = await factories.resume.create();
      
      expect(resume.id).toBeDefined();
      expect(resume.profileId).toBeDefined();
      expect(resume.title).toBeDefined();
      expect(resume.fileName).toContain('.pdf');
      expect(resume.fileUrl).toContain('storage.example.com');
      expect(resume.mimeType).toBeDefined();
      expect(typeof resume.isDefault).toBe('boolean');
      expect(typeof resume.isActive).toBe('boolean');
    });

    test('should create saved jobs', async () => {
      const savedJob = await factories.savedJob.create();
      
      expect(savedJob.id).toBeDefined();
      expect(savedJob.userId).toBeDefined();
      expect(savedJob.jobId).toBeDefined();
      expect(savedJob.createdAt).toBeInstanceOf(Date);
    });

    test('should create skill mappings', async () => {
      const skillMap = await factories.skillUserMap.create();
      
      expect(skillMap.id).toBeDefined();
      expect(skillMap.skillId).toBeDefined();
      expect(skillMap.profileId).toBeDefined();
      
      const frontendSkill = await factories.skillUserMap.createWith('frontend');
      expect(['javascript', 'typescript', 'react', 'vue', 'angular', 'css', 'html']).toContain(frontendSkill.skillId);
    });

    test('should create FCM tokens', async () => {
      const token = await factories.fcmToken.create();
      
      expect(token.id).toBeDefined();
      expect(token.userId).toBeDefined();
      expect(token.token).toHaveLength(163);
      expect(['ios', 'android']).toContain(token.platform);
    });

    test('should create OTP data', async () => {
      const otp = await factories.otp.create();
      
      expect(otp.id).toBeDefined();
      expect(otp.phoneNumber).toHaveLength(10);
      expect(otp.otp).toHaveLength(6);
      expect(otp.expiresAt).toBeInstanceOf(Date);
      expect(typeof otp.verified).toBe('boolean');
      
      const validOtp = await factories.otp.createWith('valid');
      expect(validOtp.otp).toBe('123456');
      expect(validOtp.verified).toBe(false);
    });
  });

  describe('Helper Functions', () => {
    test('should create complete user with all relations', async () => {
      const completeUser = await createCompleteUser();
      
      expect(completeUser.user).toBeDefined();
      expect(completeUser.profile).toBeDefined();
      expect(completeUser.education).toHaveLength(2);
      expect(completeUser.experience).toHaveLength(3);
      expect(completeUser.resume).toBeDefined();
      expect(completeUser.skills).toHaveLength(5);
      expect(completeUser.savedJobs).toHaveLength(3);
      expect(completeUser.fcmToken).toBeDefined();
      expect(completeUser.notificationPrefs).toBeDefined();
      expect(completeUser.jobSearchPrefs).toBeDefined();
      
      // Verify relationships
      expect(completeUser.profile.userId).toBe(completeUser.user.id);
      expect(completeUser.education[0].profileId).toBe(completeUser.profile.id);
      expect(completeUser.experience[0].profileId).toBe(completeUser.profile.id);
    });

    test('should create complete recruiter', async () => {
      const completeRecruiter = await createCompleteRecruiter();
      
      expect(completeRecruiter.user).toBeDefined();
      expect(completeRecruiter.recruiterProfile).toBeDefined();
      expect(completeRecruiter.verificationMethod).toBeDefined();
      
      expect(completeRecruiter.recruiterProfile.userId).toBe(completeRecruiter.user.id);
      expect(completeRecruiter.recruiterProfile.isVerified).toBe(true);
    });

    test('should create test scenarios', async () => {
      const newUser = await testScenarios.newUser();
      expect(newUser.createdAt.getTime()).toBeGreaterThan(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      const experienced = await testScenarios.experiencedCandidate();
      expect(experienced.profile.yearsOfExperience).toMatch(/5-8 years|8\+ years/);
      
      const entryLevel = await testScenarios.entryLevelCandidate();
      expect(entryLevel.profile.yearsOfExperience).toMatch(/0-1 years|1-3 years/);
    });
  });

  describe('FakeData Utilities', () => {
    test('should generate structured location data', () => {
      const location = FakeData.location();
      const parsed = JSON.parse(location);
      
      expect(parsed).toHaveProperty('city');
      expect(parsed).toHaveProperty('state');
      expect(parsed).toHaveProperty('country');
      expect(parsed).toHaveProperty('latitude');
      expect(parsed).toHaveProperty('longitude');
    });

    test('should generate phone with country code', () => {
      const phone = FakeData.phoneWithCountry();
      
      expect(phone.phoneNumber).toHaveLength(10);
      expect(['+1', '+44', '+91', '+49', '+33']).toContain(phone.countryCode);
    });

    test('should generate work email with domain', () => {
      const email = FakeData.workEmail('TestCorp');
      expect(email).toContain('@testcorp.com');
      
      const genericEmail = FakeData.workEmail();
      expect(genericEmail).toContain('@');
    });

    test('should generate arrays as JSON strings', () => {
      const jobTypes = JSON.parse(FakeData.jobTypes());
      expect(Array.isArray(jobTypes)).toBe(true);
      expect(jobTypes.length).toBeGreaterThan(0);
      
      const skills = JSON.parse(FakeData.skillIds());
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Factory Performance', () => {
    test('should create large datasets efficiently', async () => {
      const startTime = Date.now();
      
      const users = await factories.user.createList(100);
      const profiles = await factories.profile.createList(100);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(users).toHaveLength(100);
      expect(profiles).toHaveLength(100);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });
});