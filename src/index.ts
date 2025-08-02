import { Hono } from "hono";
import { jwt, verify, type JwtVariables } from 'hono/jwt'


import authRouter from "./auth-module/routes";
import userRouter from "./user-module/routes";
import resumeRouter from "./resume-module/routes";
import recruiterRouter from "./recruiter-module/routes";
import preferencesRouter from "./preferences-module/routes";
import educationRouter from "./education-module/routes";

const app = new Hono<{ Variables: JwtVariables }>().basePath("/api/v1");

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "hirik-user-service" });
});
app.route("/auth", authRouter);

app.use('*', async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.ACCESS_TOKEN_SECRET,
  })
  return jwtMiddleware(c, next)
})
// Mount auth routes

// Mount user routes
app.route("/user", userRouter);

// Mount resume routes
app.route("/resumes", resumeRouter);

// Mount recruiter routes
app.route("/recruiter", recruiterRouter);

// Mount preferences routes
app.route("/preferences", preferencesRouter);

// Mount education routes
app.route("/education", educationRouter);

export default app;
