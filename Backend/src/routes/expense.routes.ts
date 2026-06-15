import { FastifyInstance } from "fastify";
import { verifyToken } from "../middlewares/authMiddleware";
import expenseController from "../controllers/expense.controller";
import { CreateExpense } from "../contracts/expences.interface";



async function expenseRoutes(app: FastifyInstance) {

  app.post<{ Body: CreateExpense, Params: { tripId: string } }>(
    "/:tripId/expenses",
    { preHandler: [verifyToken] },
    expenseController.create
  )

  app.get<{ Params: { tripId: string, id: string } }>(
    "/:tripId/expenses/:id",
    { preHandler: [verifyToken] },
    expenseController.get
  )

  app.get<{ Params: { tripId: string } }>(
    "/:tripId/expenses/summery",
    { preHandler: [verifyToken] },
    expenseController.summery
  )

  app.delete<{ Params: { id: string, tripId: string } }>(
    "/:tripId/expenses/:id",
    { preHandler: [verifyToken] },
    expenseController.delete
  )

  return app;
}

export default expenseRoutes;