import { IExpense } from "../contracts/expences.interface";
import { TripAttributes } from "../contracts/trip.interface";
import Expense from "../models/expense.model";
import Trip from "../models/trip.model";

const tripInclude = { model: Trip, attributes: TripAttributes };

class ExpRepo {

  async create
    (data: IExpense) {
    const expences = await Expense.create({
      ...data
    },
      {
        include: tripInclude
      })

    return expences;
  }

  async summery
    (tripId: string) {

    const trip = await Trip.findOne({
      where: {
        id: tripId
      }
    })
    const expenses = await Expense.findAll({
      where: {
        tripId
      }
    });

    const spent = await Expense.sum("amount", {
      where: {
        tripId
      }
    })

    const totalBudget = Number(trip?.budgetLimit) || 0;
    const totalSpent = spent || 0;
    const remainingBudget = ((trip?.budgetLimit || 0) - (totalSpent || 0))
    const isOverBudget = remainingBudget < 0 ? true : false;
    let expenseOverview: any[] = []
    expenses.map((e) => {
      let value = {
        id:e.id,
        category: e.category,
        total: Number(e.amount),
        day: this.convertDay(e.createdAt),
        time: this.convertTime(e.createdAt)
      }

      expenseOverview.push(value);
    })

    return {
      totalBudget,
      totalSpent,
      remainingBudget,
      isOverBudget,
      expenseOverview
    }

  }

  async delete
    (id: string, tripId: string) {
    return Expense.destroy({
      where: {
        id,
        tripId
      }
    })
  }

  async get(id: string, tripId: string) {
    return Expense.findOne({
      where: {
        id,
        tripId
      },
      include: tripInclude
    })
  }

  async getById(id: string) {
    return Expense.findOne({
      where: {
        id
      },
      include: tripInclude
    })
  }

  private convertDay(createdAt: Date) {
    return new Date(createdAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "long"
    });
  }

  private convertTime(createdAt: Date) {
    return new Date(createdAt).toLocaleString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

}

export default new ExpRepo();