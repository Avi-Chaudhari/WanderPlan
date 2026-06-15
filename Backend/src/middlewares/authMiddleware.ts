import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config";

export async function verifyToken(req: FastifyRequest, res: FastifyReply) {

  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Missing Token! Please Provide token"
      })
    }

    const token = authHeader?.split(" ")[1]
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Missing Token! Please Provide token"
      })
    }

    const decoded: any = jwt.verify(token, ENV.jwt_secret);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    }

  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
      error
    })
  }
}

export async function verifyRole(req: FastifyRequest, res: FastifyReply) {
  try {

    const user = req.user;
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "You are Not Authorized",
      });
    }

  } catch (error) {
    console.log(error);
  }
}