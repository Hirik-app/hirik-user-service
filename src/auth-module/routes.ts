import { Hono } from 'hono';
import UserController from './controller';
import { jwt } from 'hono/jwt';

const authRouter = new Hono();

// Phone-based authentication endpoints
authRouter.post('/login-with-phone', (c) => {
    const userController = new UserController(c.env);
    return userController.loginWithPhone(c);
});

authRouter.post('/verify-otp', (c) => {
    const userController = new UserController(c.env);
    return userController.verifyOTP(c);
});

authRouter.post('/refresh-token', (c, next) => {
    const middleware = jwt({
        secret: (c.env as any).REFRESH_TOKEN_SECRET,
    });
    return middleware(c, next);
}, (c) => {
    const userController = new UserController(c.env);
    return userController.refreshToken(c);
});

export default authRouter;