import { FastifyInstance } from "fastify";
import authController from "../controllers/auth.controller";


async function authRoutes(app:FastifyInstance) {
  
  app.post(
    "/register",
      authController.register
  )
   app.post(
    "/login",
      authController.login
  )

  return app;

}

export default authRoutes;