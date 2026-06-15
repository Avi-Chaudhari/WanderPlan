import createItinerary from "../repositories/itinerary.repo";
import tripRepo from "../repositories/trip.repo";
import userRepo from "../repositories/user.repo";
import { BaseService, ServiceResponce } from "../utils/BaseService";
import ItineraryModel from "../models/itinerary.model"


class Itinerary extends BaseService {
  async create
    (data: { city: string, country: string, budget: number, days: number },userId:string , tripId:string)
    : Promise<ServiceResponce> {
    try {

      const trip = await tripRepo.findById(tripId);
      if(!trip){
        return this.error("Trip not found",404);
      }
      const user = await userRepo.findById(userId);
      if(!user){
        return this.error("User not found",404);
      }
      if(trip.userId !== userId){
        return this.error("Not Authorized to manage this bussiness",404);
      }

      if(!data.city || !data.country){
        return this.error( `city and country are required.`, 400 );
      }

      if(data.budget <= 0 || data.days <= 0){
        return this.error( `your budget and days should be greater than 0`, 400 );
      }

      const preExist = await ItineraryModel.findOne({where:{tripId}});
      if(preExist){
        return this.success(preExist,"Generated",200);
      }     

      const result = await createItinerary(tripId,data.city,data.country,data.budget,data.days);

      return this.success(result, "Itinerary Created", 200);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }
}

export default new Itinerary();