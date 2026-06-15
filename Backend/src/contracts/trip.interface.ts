export interface ITrip{ 
  userId: string;
  destinationCity: string;
  destinationCountry: string;
  startDate: string; 
  endDate: string;
  budgetLimit: number;
  countryFlag: string; 
  currencyCode: string;
  createdAt: Date;
  updatedAt:Date;
}

export interface CreateTrip {
  userId:string;
  destinationCity: string;
  destinationCountry: string;
  startDate: string; 
  endDate: string;
  budgetLimit: number;
  countryFlag: string; 
  currencyCode: string;
}

export const TripAttributes  = ["userId","destinationCity","destinationCountry","startDate","endDate","budgetLimit" , "countryFlag", "currencyCode"]
