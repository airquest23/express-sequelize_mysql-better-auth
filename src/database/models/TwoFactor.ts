import { DataTypes, Model } from "sequelize";
import db from "../config";

export class TwoFactor extends Model {
  declare id: string;
  declare secret: string;
  declare backupCodes : string;
  declare userId: string;
};

TwoFactor.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  secret: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  backupCodes: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
},
{
  sequelize: db,
  modelName: 'twoFactor',
  tableName: 'twoFactor',
  timestamps: true,
  indexes: [
    {
      name: 'twoFactor_secret_idx',
      fields: ['secret']
    },
    {
      name: 'twoFactor_userId_idx',
      fields: ['userId']
    }
  ]
});