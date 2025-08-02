import { Hono } from 'hono';
import PreferencesController from './controller';

const preferencesRoutes = new Hono();

// Job Search Preferences routes
preferencesRoutes.get('/job-search', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.getJobSearchPreferences(c);
});

preferencesRoutes.put('/job-search', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.updateJobSearchPreferences(c);
});

// Notification Preferences routes
preferencesRoutes.get('/notifications', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.getNotificationPreferences(c);
});

preferencesRoutes.put('/notifications', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.updateNotificationPreferences(c);
});

// Saved Jobs routes
preferencesRoutes.get('/saved-jobs', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.getSavedJobs(c);
});

preferencesRoutes.post('/saved-jobs', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.saveJob(c);
});

preferencesRoutes.delete('/saved-jobs/:jobId', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.unsaveJob(c);
});

// FCM Token routes
preferencesRoutes.get('/fcm-tokens', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.getFCMTokens(c);
});

preferencesRoutes.post('/fcm-tokens', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.addFCMToken(c);
});

preferencesRoutes.delete('/fcm-tokens/:token', (c) => {
    const preferencesController = new PreferencesController(c.env);
    return preferencesController.removeFCMToken(c);
});

export default preferencesRoutes;