export interface IExpense{
  tripId: string;
  amount: number;
  category: string;
  description: string;
}

export interface CreateExpense{
  amount: number;
  category: string;
  description: string;
}