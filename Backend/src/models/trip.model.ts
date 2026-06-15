import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";


class Trip extends Model {
  declare id: string;
  declare userId: string;
  declare destinationCity: string;
  declare destinationCountry: string;
  declare startDate: string;
  declare endDate: string;
  declare budgetLimit: number;
  declare countryFlag: string;
  declare currencyCode: string;
  readonly declare createdAt: Date;
  readonly declare updatedAt: Date;
}

Trip.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  destinationCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationCountry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budgetLimit: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  countryFlag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currencyCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    sequelize,
    tableName: "trips",
    timestamps: true
  }
)

User.hasMany(Trip, { foreignKey: "userId" as "trips" });
Trip.belongsTo(User,{foreignKey:"userId" as "user"});

export default Trip;