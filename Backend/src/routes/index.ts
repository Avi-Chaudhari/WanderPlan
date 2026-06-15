import { FastifyInstance } from "fastify";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import tripRoutes from "./trip.routes";
import expenseRoutes from "./expense.routes";
import apiServicesRoutes from "./apiServices.routes";

export default async function routes(
  fastify: FastifyInstance
) {
  
  fastify.register(authRoutes, {
    prefix: "/auth"
  });
  
  fastify.register(userRoutes, {
    prefix: "/users"
  });

  fastify.register(tripRoutes, {
    prefix: "/trips"
  });

  fastify.register(expenseRoutes, {
    prefix: "/trips"
  });
  fastify.register(apiServicesRoutes, {
    prefix: "/services"
  });
}