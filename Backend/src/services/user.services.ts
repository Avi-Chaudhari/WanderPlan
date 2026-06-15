import { IUser } from "../contracts/user.interface";
import userRepo from "../repositories/user.repo";
import { BaseService, ServiceResponce } from "../utils/BaseService";
import { generateToken } from "../utils/jwtHandler";
import { comparePassword, hashPassword } from "../utils/passwordHandler";

class User extends BaseService {
  async getProfile
    (id: string)
    : Promise<ServiceResponce> {
    try {

      const user = await userRepo.findById(id);
      if (!user) {
        return this.error("No user found.", 404);
      }

      return this.success(user, "Profile fetched", 200)

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async update
    (data: IUser, id: string)
    : Promise<ServiceResponce> {
    try {
      const checkUser = await userRepo.findById(id);
      if (!checkUser) {
        return this.error("No user found.", 404);
      }

      if (data.email) {
        const isExistingEmail = await userRepo.findUserByEmail(data.email);
        if (isExistingEmail && id !== isExistingEmail.id) {
          return this.error("this email exists ! choose another.", 400);
        }
      } else {
        data.email = checkUser.email;
      }
      if (data.password) {
        let hashed = await hashPassword(data.password);
        data.password = hashed;
      } else {
        data.password = checkUser.password
      }
      if (!data.city) {
        data.city = checkUser.city
      }
      if (!data.country) {
        data.country = checkUser.country
      }

      const user = await userRepo.update(data, id);

      if (!user) return this.error("faied to update user.");
      return this.success(null, "Updated", 200);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async list(){
    const users = await userRepo.list();
    return this.success(users,"Users Fetched.")
  }

}

export default new User();