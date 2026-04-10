import { DataTypes, Model } from "sequelize";
import db from "../config";

export class AdminMessage extends Model {
  declare id: string;
  declare from: string;
  declare message?: string;
};

AdminMessage.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  from: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
  },
},
{
  sequelize: db,
  modelName: 'adminMessage',
  tableName: 'adminMessage',
  timestamps: true,
});