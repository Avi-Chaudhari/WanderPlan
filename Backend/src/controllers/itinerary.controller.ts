import { FastifyReply, FastifyRequest } from "fastify";
import itineraryServices from "../services/itinerary.services";
import { sendReply } from "../utils/sendReply";

class Itinerary {
  async create
    (request: FastifyRequest <{Body:{city: string, country: string, budget: number, days: number },Params:{tripId:string}}>, reply: FastifyReply) {
    const userId = request.user?.userId || "";
    const {tripId} = request.params;
    const body = request.body;
    const result = await itineraryServices.create(body , userId,tripId);

    return sendReply(reply, result);
  }
}

export default new Itinerary()