import { DataTypes, Model, UUIDV4} from 'sequelize';
import { sequelize } from '../config/db';
import Trip from './trip.model';

export class Itinerary extends Model{
  declare id: string;
  declare tripId: string;
  declare scheduleText: string; // Will store the Markdown itinerary from Gemini
  readonly declare createdAt: Date;
  readonly declare updatedAt: Date;
}

Itinerary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue : UUIDV4,
      primaryKey: true,
    },
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, // One trip can only have one generated itinerary
      references: { model: 'trips', key: 'id' },
      onDelete: 'CASCADE',
    },
    scheduleText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { 
    sequelize, 
    tableName: 'itineraries',
    timestamps : true
  }
);

Trip.hasOne(Itinerary,{foreignKey : "tripId", as :"itineraries" });
Itinerary.belongsTo(Trip,{foreignKey:"tripId", as : "trip"});

export default Itinerary;