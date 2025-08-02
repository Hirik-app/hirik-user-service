import { Hono } from 'hono';
import EducationController from './controller';

const educationRoutes = new Hono();

// Get all education records for a profile
educationRoutes.get('/profile/:profileId', (c) => {
    const educationController = new EducationController(c.env);
    return educationController.getEducationByProfileId(c);
});

// Add new education record to a profile
educationRoutes.post('/profile/:profileId', (c) => {
    const educationController = new EducationController(c.env);
    return educationController.addEducationByProfileId(c);
});

// Update an education record by ID
educationRoutes.put('/:id', (c) => {
    const educationController = new EducationController(c.env);
    return educationController.updateEducationById(c);
});

// Delete an education record by ID
educationRoutes.delete('/:id', (c) => {
    const educationController = new EducationController(c.env);
    return educationController.deleteEducationById(c);
});

export default educationRoutes;