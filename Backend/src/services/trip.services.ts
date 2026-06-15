import { CreateTrip } from "../contracts/trip.interface";
import tripRepo from "../repositories/trip.repo";
import userRepo from "../repositories/user.repo";
import { BaseService, ServiceResponce } from "../utils/BaseService";
import convertDateFormat from "../utils/handleDateformat";
// import restCountries from "./restCountries";
import restCountries from "./restCountries";

class Trip extends BaseService {

  async create
    (data: { destinationCity: string, destinationCountry: string, budgetLimit: number, endDate: string, startDate: string, userId: string })
    : Promise<ServiceResponce> {
    try {

      const requiredFields = ['destinationCity', 'destinationCountry', 'startDate', 'endDate'] as const;

      const missingFields = requiredFields.filter(
        field => !data[field]?.trim()
      );

      if (missingFields.length > 0) {
        return this.error(`Please enter required fields: ${missingFields.join(', ')}.`, 400);
      }
      // // Valid formats: DD-MM-YYYY or YYYY-MM-DD
      // const dateRegexDDMMYYYY = /^\d{2}-\d{2}-\d{4}$/;
      // const dateRegexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
      // if (
      //   !dateRegexDDMMYYYY.test(data.startDate) ||
      //   !dateRegexYYYYMMDD.test(data.startDate) ||
      //   !dateRegexDDMMYYYY.test(data.endDate) ||
      //   !dateRegexYYYYMMDD.test(data.endDate)
      // ) {
      //   return this.error(`Invalid date format expected: [ DD-MM-YYYY or YYYY-MM-DD ]`, 400);
      // }

      if (data.budgetLimit <= 0) {
        return this.error(`your budget should be greater than 0`, 400);
      }

      data.startDate = convertDateFormat(data.startDate);
      data.endDate = convertDateFormat(data.endDate);

      // const rc = await restCountries(data.destinationCountry);

      const sendData = {
        countryFlag:  "🇮🇳",
        currencyCode: "INR",
        ...data
      }

      const result = await tripRepo.create(sendData);

      return this.success(result, "Created", 201);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async list(userId: string)
    : Promise<ServiceResponce> {
    try {
      const user = await userRepo.findById(userId);
      if (!user) {
        return this.error("User not found ", 404);
      }

      const result = await tripRepo.list(userId);
      return this.success(result, "Fetched your trips.");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async get(id: string, userId: string) {
    try {
      const user = await userRepo.findById(userId);
      if (!user) {
        return this.error("User not found ", 404);
      }

      const result = await tripRepo.get(id, userId);

      return this.success(result, "Fetched Trip details");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async delete(id: string, userId: string) {
    try {
      const user = await userRepo.findById(userId);
      if (!user) {
        return this.error("User not found ", 404);
      }

      const trip = await tripRepo.findById(id);

      if (!trip) {
        return this.error("Trip not found.", 404);
      }

      if (trip?.userId !== userId) {
        return this.error("You are Not Authorized to manage this trip.", 403);
      }

      await tripRepo.delete(id, userId);
      return this.success({ id: trip.id }, "Deleted");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }
}

export default new Trip();