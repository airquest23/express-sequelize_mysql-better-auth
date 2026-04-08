import { DataTypes, Model } from "sequelize";
import db from "../config";

export class RateLimit extends Model {
  declare id: string;
  declare key: string;
  declare count : Number;
  declare lastRequest: Number;
};

RateLimit.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lastRequest: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
},
{
  sequelize: db,
  modelName: 'rateLimit',
  tableName: 'rateLimit',
  timestamps: true
});