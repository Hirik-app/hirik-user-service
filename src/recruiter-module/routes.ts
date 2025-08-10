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

// Send verification email
recruiterRoutes.post('/send-verification-email', (c) => {
	const recruiterController = new RecruiterController(c.env);
	return recruiterController.sendVerificationEmail(c);
});

// Verify email
recruiterRoutes.get('/verify-email/:token', (c) => {
	const recruiterController = new RecruiterController(c.env);
	return recruiterController.verifyEmail(c);
});

// Send email OTP
recruiterRoutes.post('/send-email-otp', (c) => {
	const recruiterController = new RecruiterController(c.env);
	return recruiterController.sendEmailOtp(c);
});

// Verify email OTP
recruiterRoutes.post('/verify-email-otp', (c) => {
	const recruiterController = new RecruiterController(c.env);
	return recruiterController.verifyEmailOtp(c);
});

export default recruiterRoutes;