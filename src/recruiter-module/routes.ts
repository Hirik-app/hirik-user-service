import { Hono } from 'hono';
import RecruiterController from './controller';

const recruiterRoutes = new Hono();

// Get recruiter profile for authenticated user
recruiterRoutes.get('/profile', (c) => {
    const recruiterController = new RecruiterController(c.env);
    return recruiterController.getRecruiterProfile(c);
});

// Create or update recruiter profile
recruiterRoutes.put('/profile', (c) => {
    const recruiterController = new RecruiterController(c.env);
    return recruiterController.updateRecruiterProfile(c);
});

// Verify a recruiter (admin operation)
recruiterRoutes.post('/verify/:recruiterId', (c) => {
    const recruiterController = new RecruiterController(c.env);
    return recruiterController.verifyRecruiter(c);
});

export default recruiterRoutes;