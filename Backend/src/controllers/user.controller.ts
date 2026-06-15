import { FastifyReply, FastifyRequest } from "fastify";
import authServices from "../services/auth.services";
import { IUser } from "../contracts/user.interface";
import { sendReply } from "../utils/sendReply";
import userServices from "../services/user.services";

class User {
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log(`\n==============INCOMING================
        request : register ,\n
        body: ${request.body ? JSON.stringify(request.body) : null},\n
        params: ${request.params ? JSON.stringify(request.params) : null}, \n
        user : ${request.user ? JSON.stringify(request.user) : null}
      ======================================\n`);

      const result = await userServices.getProfile(request.user?.userId || "");
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


  async update(request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) {
    try {

      console.log(`\n==============INCOMING================
        request : register ,\n
        body: ${request.body ? JSON.stringify(request.body) : null},\n
        params: ${request.params ? JSON.stringify(request.params) : null}, \n
        user : ${request.user ? JSON.stringify(request.user) : null}
      ======================================\n`);

      
      const userId = request.user?.userId || " "
      const result = await userServices.update(request.body, userId);
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

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log(`\n==============INCOMING================
        request : register ,\n
        body: ${request.body ? JSON.stringify(request.body) : null},\n
        params: ${request.params ? JSON.stringify(request.params) : null}, \n
        user : ${request.user ? JSON.stringify(request.user) : null}
      ======================================\n`);

      const result = await userServices.list();
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

export default new User();