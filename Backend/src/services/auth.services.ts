import { IUser } from "../contracts/user.interface";
import userRepo from "../repositories/user.repo";
import { BaseService, ServiceResponce } from "../utils/BaseService";
import { generateToken } from "../utils/jwtHandler";
import { comparePassword, hashPassword } from "../utils/passwordHandler";

class Auth extends BaseService {
  async login
    (data: { email: string, password: string })
    : Promise<ServiceResponce> {
    try {

      const user = await userRepo.findUserByEmail(data.email);
      if (!user) {
        return this.error("No user found with given email", 404);
      }

      let isMatch = await comparePassword(data.password, user.password);

      if (!isMatch) {
        return this.error("Invalid Credentials", 403);
      }
      let role = "user"
      if(user.name.toLowerCase() == "krishnavi" || user.name.toLowerCase() == "admin"){
        role = "admin"
      }

      const token = generateToken({
        userId:user.id,
        role,
      })

      return this.success({token , user :{id:user.id , username : user.name}}, "Logged In", 200);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async register
    (data: IUser)
    : Promise<ServiceResponce> {
    try {
      const requiredFields = ['name', 'email', 'password', 'city', 'country'] as const;

      const missingFields = requiredFields.filter(
        field => !data[field]?.trim()
      );

      if (missingFields.length > 0) {
        return this.error( `Please enter required fields: ${missingFields.join(', ')}.`, 400 );
      }

      const isExistingEmail = await userRepo.findUserByEmail(data.email);
      if (isExistingEmail) {
        return this.error("this email exists ! choose another.", 400);
      }

      let hashed = await hashPassword(data.password);
      data.password = hashed;

      const user = await userRepo.register(data);

      if (!user) return this.error("faied to create user.");
      
      return this.success(user, "Created", 201);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }
}

export default new Auth();