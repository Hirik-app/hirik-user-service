import { Hono } from 'hono';
import ResumeController from './controller';

const resumeRoutes = new Hono();

// Get all resumes for the authenticated user
resumeRoutes.get('/', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.getResumes(c);
});

// Get a specific resume by ID
resumeRoutes.get('/:resumeId', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.getResumeById(c);
});

// Create a new resume
resumeRoutes.post('/', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.createResume(c);
});

// Update a resume
resumeRoutes.put('/:resumeId', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.updateResume(c);
});

// Set a resume as default
resumeRoutes.patch('/:resumeId/default', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.setDefaultResume(c);
});

// Delete a resume (soft delete)
resumeRoutes.delete('/:resumeId', (c) => {
    const resumeController = new ResumeController(c.env);
    return resumeController.deleteResume(c);
});

export default resumeRoutes;