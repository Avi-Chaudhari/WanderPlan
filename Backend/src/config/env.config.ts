import { configDotenv } from "dotenv"
configDotenv();

export const ENV = {
  port : process.env.PORT || 9900,
  db_user: process.env.DB_USER || "root",
  db_name: process.env.DB_NAME || "wanderplan",
  db_password : process.env.DB_PASSWORD || "krishna@avi",
  db_host: process.env.DB_HOST || "127.0.0.1",
  ai_key : process.env.AI_API_KEY || "my_key",
  jwt_secret : process.env.JWT_SECRET || "KrIsHnaVI",
}