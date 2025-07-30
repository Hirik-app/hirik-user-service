import { Hono } from 'hono';
import UserController from './controller';

const userRoutes = new Hono();

// User routes
userRoutes.get('/me', (c) => {
    const userController = new UserController(c.env);
    return userController.getMe(c);
});

userRoutes.get('/profile', (c) => {
    const userController = new UserController(c.env);
    return userController.getProfile(c);
});

userRoutes.put('/profile', (c) => {
    const userController = new UserController(c.env);
    return userController.updateProfile(c);
});

// Education routes
userRoutes.get('/profile/education/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.getEducationByProfileId(c);
});

userRoutes.post('/profile/education/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.addEducationByProfileId(c);
});

userRoutes.put('/profile/education/:id', (c) => {
    const userController = new UserController(c.env);
    return userController.updateEducationById(c);
});

userRoutes.delete('/profile/education/:id', (c) => {
    const userController = new UserController(c.env);
    return userController.deleteEducationById(c);
});

// Experience routes  
userRoutes.get('/profile/experience/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.getExperienceByProfileId(c);
});

userRoutes.post('/profile/experience/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.addExperienceByProfileId(c);
});

userRoutes.put('/profile/experience/:id', (c) => {
    const userController = new UserController(c.env);
    return userController.updateExperienceById(c);
});

userRoutes.delete('/profile/experience/:id', (c) => {
    const userController = new UserController(c.env);
    return userController.deleteExperienceById(c);
});

// Skills routes (Phase 1)
userRoutes.get('/profile/skills/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.getSkillsByProfileId(c);
});

userRoutes.post('/profile/skills/:profileId', (c) => {
    const userController = new UserController(c.env);
    return userController.addSkillsToProfile(c);
});

// Job Search Preferences routes (Phase 2)
userRoutes.get('/job-search-preferences', (c) => {
    const userController = new UserController(c.env);
    return userController.getJobSearchPreferences(c);
});

userRoutes.put('/job-search-preferences', (c) => {
    const userController = new UserController(c.env);
    return userController.updateJobSearchPreferences(c);
});

// Notification Preferences routes (Phase 2)
userRoutes.get('/notification-preferences', (c) => {
    const userController = new UserController(c.env);
    return userController.getNotificationPreferences(c);
});

userRoutes.put('/notification-preferences', (c) => {
    const userController = new UserController(c.env);
    return userController.updateNotificationPreferences(c);
});

// Saved Jobs routes (Phase 2)
userRoutes.get('/saved-jobs', (c) => {
    const userController = new UserController(c.env);
    return userController.getSavedJobs(c);
});

userRoutes.post('/saved-jobs', (c) => {
    const userController = new UserController(c.env);
    return userController.saveJob(c);
});

userRoutes.delete('/saved-jobs/:jobId', (c) => {
    const userController = new UserController(c.env);
    return userController.unsaveJob(c);
});

// FCM Token routes (Phase 2)
userRoutes.get('/fcm-tokens', (c) => {
    const userController = new UserController(c.env);
    return userController.getFCMTokens(c);
});

userRoutes.post('/fcm-tokens', (c) => {
    const userController = new UserController(c.env);
    return userController.addFCMToken(c);
});

userRoutes.delete('/fcm-tokens/:token', (c) => {
    const userController = new UserController(c.env);
    return userController.removeFCMToken(c);
});

// Recruiter Profile routes (Phase 4)
userRoutes.get('/recruiter-profile', (c) => {
    const userController = new UserController(c.env);
    return userController.getRecruiterProfile(c);
});

userRoutes.put('/recruiter-profile', (c) => {
    const userController = new UserController(c.env);
    return userController.updateRecruiterProfile(c);
});

userRoutes.post('/recruiter-profile/verify/:recruiterId', (c) => {
    const userController = new UserController(c.env);
    return userController.verifyRecruiter(c);
});

export default userRoutes;