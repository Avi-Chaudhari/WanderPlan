import { UserAttributes, IUser } from "../contracts/user.interface";
import User from "../models/user.model";

class UserRepo {

  async register(data : IUser){
    try {
      
      const user = await User.create({
        ...data
      })

      return {id:user.id}

    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email:string){
    return User.findOne({
      where:{
        email
      }
    })
  }

  async findById(id:string){
    return User.findOne({where:{id},attributes:UserAttributes})
  }

  async update(data:IUser , id :string){
    return User.update(
      {
        ...data
      },
      {
        where:{
          id
        }
      }
    )
  }

  async list(){
    return User.findAll();
  }
}

export default new UserRepo();