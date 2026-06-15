import { Sequelize } from "sequelize";
import { ENV } from "./env.config";

export const sequelize = new Sequelize(
  ENV.db_name as string,
  ENV.db_user as string,
  ENV.db_password as string,
  {
   dialect:"mysql",
   host:ENV.db_host,
   logging:false
  }
)

export const makeConnection = async()=>{
  await sequelize.authenticate()
  .then(()=>{
    console.log("DB Connection Successful.");
  })
  .catch((er)=>{
    console.log("DB Connection Failed.");
    console.log(`
      ${ENV.db_password} | ${ENV.db_user} | ${ENV.db_host}  
      `);
    
    throw er ;    
  });
}