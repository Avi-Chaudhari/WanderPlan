import { FastifyReply } from "fastify";
import { ServiceResponce } from "./BaseService";


export function sendReply(reply : FastifyReply,result : ServiceResponce){



  return reply.status(result.success ? result.statusCode ?? 200 : result.statusCode ?? 500).send({
    success: result.success,
    statusCode:result.statusCode || 200,
    message:result.message,
    data: result.data || [],
    ...(result.error && {error : result.error}),
    
  })
}