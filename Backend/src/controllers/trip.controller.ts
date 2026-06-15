import { FastifyReply, FastifyRequest } from "fastify";
import tripServices from "../services/trip.services";
import { sendReply } from "../utils/sendReply";

export interface TCreateBody {
  destinationCity: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
}

class Trip {
  async create
    (
      request: FastifyRequest<{ Body: TCreateBody }>,
      reply: FastifyReply) {
    const userId = request.user?.userId || "";

    const { destinationCity, destinationCountry, budgetLimit, endDate, startDate } = request.body;

    const result = await tripServices.create({ destinationCity, destinationCountry, budgetLimit, endDate, startDate, userId });

    return sendReply(reply, result);
  }

  async list
    (
      request: FastifyRequest,
      reply: FastifyReply
    ) {
    const userId = request.user?.userId || "";

    const result = await tripServices.list(userId);

    return sendReply(reply, result);
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.userId || "";
    const { id } = request.params;

    const result = await tripServices.get(id, userId);

    return sendReply(reply, result);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.userId || "";
    const { id } = request.params;

    const result = await tripServices.delete(id, userId);

    return sendReply(reply, result);
  }

}

export default new Trip();