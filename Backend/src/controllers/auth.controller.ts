import { FastifyReply, FastifyRequest } from "fastify";
import authServices from "../services/auth.services";
import { IUser } from "../contracts/user.interface";
import { sendReply } from "../utils/sendReply";

class Auth {
  async login(request: FastifyRequest<{ Body: { email: string, password: string } }>, reply: FastifyReply) {
    try {
      console.log(`\n==============INCOMING================
        request : register ,\n
        body: ${request.body ?? null}
      ==============================\n`);
      console.log( typeof request.body);
      

      const result = await authServices.login(request.body);
      return sendReply(reply, result);

    } catch (error) {
      console.log(error);
      return reply.status(500).send({
        success: false,
        message: "Unexpected error occured.",
        error
      })
    }
  }


  async register(request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) {
    try {

      console.log(`\n==============INCOMING================
        request : register ,\n
        body: ${request.body ?JSON.stringify(request.body) : null }
      ==============================\n`);

      const result = await authServices.register(request.body);
      return sendReply(reply, result);

    } catch (error) {
      console.log(error);
      return reply.status(500).send({
        success: false,
        message: "Unexpected error occured.",
        error
      })
    }
  }
}

export default new Auth();