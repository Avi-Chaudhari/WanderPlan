import { FastifyReply, FastifyRequest } from "fastify";
import { CreateExpense } from "../contracts/expences.interface";
import expenseServices from "../services/expense.services";
import { sendReply } from "../utils/sendReply";

class Expense {
  async create
    (request: FastifyRequest<{ Body: CreateExpense, Params: { tripId: string } }>, reply: FastifyReply) {
    const body = request.body;
    const tripId = request.params.tripId;
    const userId = request.user?.userId ?? "";

    const result = await expenseServices.create(body, tripId, userId);
    return sendReply(reply, result);

  }

  async summery
    (request: FastifyRequest<{ Params: { tripId: string } }>, reply: FastifyReply) {
    const { tripId } = request.params;
    const userId = request.user?.userId ?? "";

    const result = await expenseServices.summery( tripId, userId);
    return sendReply(reply, result);
  }

  async get
    (request: FastifyRequest<{ Params: { id: string, tripId: string } }>, reply: FastifyReply) {
    const { tripId, id } = request.params;
    const userId = request.user?.userId ?? "";

    const result = await expenseServices.get(id, tripId, userId);
    return sendReply(reply, result);
  }

  async delete
    (request: FastifyRequest<{ Params: { id: string, tripId: string } }>, reply: FastifyReply) {
    const { tripId, id } = request.params;
    const userId = request.user?.userId ?? "";

    const result = await expenseServices.delete(id, tripId, userId);
    return sendReply(reply, result);
  }
}

export default new Expense()