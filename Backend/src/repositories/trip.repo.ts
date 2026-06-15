import { CreateTrip } from "../contracts/trip.interface";
import { UserAttributes } from "../contracts/user.interface";
import Trip from "../models/trip.model";
import User from "../models/user.model";

const userInclude = { model: User, attributes: UserAttributes };

class TripRepo {

  async create(data: CreateTrip) {
    const trip = await Trip.create({
      ...data
    }, {
      include: userInclude
    });
    return trip;
  }

  async list(userId: string) {
    return Trip.findAll({
      where: {
        userId
      },
      include: userInclude
    });
  }

  async get(id:string,userId:string){
    return Trip.findOne({
      where:{
        id,
        userId
      },
      include : userInclude
    });
  }

  async delete(id:string,userId:string){
    return Trip.destroy({
      where:{
        id,
        userId
      }
    });
  }

  async findById(id:string){
    return Trip.findOne({
      where:{
        id
      }
    })
  }

}

export default new TripRepo();