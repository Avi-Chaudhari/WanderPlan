import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db";


class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare city: string;
  declare country : string;
  readonly declare createdAt: Date;
  readonly declare updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  country:{
    type:DataTypes.STRING,
    allowNull:false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
  {
    sequelize,
    tableName: "users",
    timestamps: true
  }
)

export default User;