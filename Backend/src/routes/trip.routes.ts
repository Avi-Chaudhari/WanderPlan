import { FastifyInstance } from "fastify";
import { verifyToken } from "../middlewares/authMiddleware";
import tripController, { TCreateBody } from "../controllers/trip.controller";
import { CreateTrip } from "../contracts/trip.interface";


async function tripRoutes(app:FastifyInstance) {
  
  app.post<{Body:TCreateBody}>(
    "/new",
    {preHandler:[verifyToken]},
      tripController.create
  )
   app.get(
    "/list",
    {preHandler:[verifyToken]},
    tripController.list
  )
  app.get<{Params:{id:string}}>(
    "/:id",
    {preHandler:[verifyToken ]},
      tripController.get
  )
  app.delete<{Params:{id:string}}>(
    "/:id",
    {preHandler:[verifyToken ]},
      tripController.delete
  )

  return app;

}

export default tripRoutes;