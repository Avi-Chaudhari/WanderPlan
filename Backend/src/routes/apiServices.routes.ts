import { FastifyInstance } from "fastify";
import itineraryController from "../controllers/itinerary.controller";
import { verifyToken } from "../middlewares/authMiddleware";
import { getWeatherHandler } from "../controllers/weather.controller";


async function apiServicesRoutes(app:FastifyInstance) {
  
  app.post<{Body:{city: string, country: string, budget: number, days: number },Params:{tripId:string}}>(
    "/generate-itinerary/:tripId",
    {preHandler:[verifyToken]},
    itineraryController.create
  )

  app.get(
    "/weather",
    getWeatherHandler
  )

  return app;

}

export default apiServicesRoutes;