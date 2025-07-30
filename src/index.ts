import { Hono } from "hono";
import { jwt, type JwtVariables } from 'hono/jwt'


import authRouter from "./auth-module/routes";
import userRouter from "./user-module/routes";

const app = new Hono<{ Variables: JwtVariables }>().basePath("/api/v1");

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "hirik-user-service" });
});
app.route("/auth", authRouter);

app.use('*', (c, next) => {
  const middleware = jwt({
    secret: (c.env as any).ACCESS_TOKEN_SECRET,
  });
  return middleware(c, next);
});
// Mount auth routes

// Mount user routes
app.route("/user", userRouter);

export default app;
