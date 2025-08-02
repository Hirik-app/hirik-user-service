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

// Search routes
userRoutes.get('/search/profiles', (c) => {
    const userController = new UserController(c.env);
    return userController.searchProfiles(c);
});

export default userRoutes;