import { FastifyInstance } from "fastify";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";
import { verifyRole, verifyToken } from "../middlewares/authMiddleware";
import { IUser } from "../contracts/user.interface";


async function userRoutes(app:FastifyInstance) {
  
  app.get(
    "/profile",
    {preHandler:[verifyToken]},
      userController.getProfile
  )
   app.put<{Body:IUser}>(
    "/update-profile",
    {preHandler:[verifyToken]},
    userController.update
  )
  app.get(
    "/all",
    {preHandler:[verifyToken , verifyRole ]},
      userController.list
  )

  return app;

}

export default userRoutes;