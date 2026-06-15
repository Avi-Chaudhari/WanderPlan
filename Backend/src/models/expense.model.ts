import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db";
import Trip from "./trip.model";


class Expense extends Model {
  declare id: string;
  declare tripId: string;
  declare amount: number;
  declare category: string;
  declare description: string;
  readonly declare createdAt: Date;
  readonly declare updatedAt: Date;
}

Expense.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  tripId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Trip,
      key: "id"
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10,4),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    sequelize,
    tableName: "expenses",
    timestamps: true
  }
)

Trip.hasMany(Expense, { foreignKey: "tripId" as "expenses" });
Expense.belongsTo(Trip,{foreignKey:"tripId" as "trip"});

export default Expense;