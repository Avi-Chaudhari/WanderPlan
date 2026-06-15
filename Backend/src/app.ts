import fastify from "fastify";
import { makeConnection, sequelize } from "./config/db";
import { ENV } from "./config/env.config";
import routes from "./routes";
import cors from "@fastify/cors"

async function app() {
  const app = fastify();

  await makeConnection();
  sequelize.sync({ alter: false })

  await app.register(cors,({
    origin:true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
  }))
  //  await app.register(cors);

  app.get("/", (req: any, res: any) => {
    return res.status(200).send({
      status: "Server is listning",
      author: "Avi Chaudhari",
      project: "WanderPlan",
      description: ` WanderPlan. Your personal AI travel architect. A modern full-stack web application designed to simplify trip planning through automated itineraries, expense tracking, and real-time environmental data.Tech: React.js | Fastify | TypeScript | Sequelize | MySQL
      `
    })
  })

  app.register(routes);

  app.listen({ port: ENV.port as number }, () => {
    console.log(`Server is Listening on ${'http://127.0.0.1:' + ENV.port}`);
  });
}

app();