import { CreateExpense } from "../contracts/expences.interface";
import expenseRepo from "../repositories/expense.repo";
import tripRepo from "../repositories/trip.repo";
import { BaseService, ServiceResponce } from "../utils/BaseService";

class Expense extends BaseService {
  async create
    (
      data: CreateExpense, tripId: string, userId: string
    )
    : Promise<ServiceResponce> {
    try {

      const trip = await tripRepo.findById(tripId);
      if (!trip) {
        return this.error("Trip not found", 404);
      }

      if (trip.userId !== userId) {
        return this.error("You are not Authorized to manage this trip.", 403);
      }

      let category = data.category.trim();

      if (!category) {
        return this.error("Category must be provided.", 400);
      }

      const result = await expenseRepo.create({ tripId, ...data });

      if (data.amount <= 0 || isNaN(data.amount)) {
        return this.error("Expense amount must be number and should be greater than 0", 400);
      }

      return this.success(result, "Created.", 201);

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async summery
    (
      tripId: string , userId : string
    )
    : Promise<ServiceResponce> {
    try {

      const trip = await tripRepo.findById(tripId);
      if (!trip) {
        return this.error("Trip not found", 404);
      }

      if (trip.userId !== userId) {
        return this.error("You are not Authorized to manage this trip.", 403);
      }

      const result = await expenseRepo.summery(tripId);

      return this.success(result, "Expense Summery.");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async delete
    (
      id: string, tripId: string, userId: string
    )
    : Promise<ServiceResponce> {
    try {

      const expense = await expenseRepo.getById(id);

      if (!expense) {
        return this.error("No such expense exist", 404);
      }

      const trip = await tripRepo.findById(tripId);
      if (!trip) {
        return this.error("Trip not found", 404);
      }

      if (trip.userId !== userId) {
        return this.error("You are not Authorized to manage this trip.", 403);
      }

      if (expense.tripId !== tripId) {
        return this.error("this Expense Exist for another trip")
      }

      await expenseRepo.delete(id, tripId)

      return this.success({ id: expense.id }, "Deleted.");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }

  async get
    (
      id: string, tripId: string, userId: string
    )
    : Promise<ServiceResponce> {
    try {

      const expense = await expenseRepo.getById(id);

      if (!expense) {
        return this.error("No such expense exist", 404);
      }

      const trip = await tripRepo.findById(tripId);
      if (!trip) {
        return this.error("Trip not found", 404);
      }

      if (trip.userId !== userId) {
        return this.error("You are not Authorized to manage this trip.", 403);
      }
      if (expense.tripId !== tripId) {
        return this.error("this Expense Exist for another trip", 400)
      }

      const result = await expenseRepo.get(id, tripId)


      return this.success(result, "Fetched.");

    } catch (error) {
      console.log(error);
      return this.error("Internal Server Error", 500, error);
    }
  }
}

export default new Expense();