import { DataTypes, Model } from "sequelize";
import db from "../config";

export class Verification extends Model {
  declare id: string;
  declare identifier: string;
  declare value : string;
  declare expiresAt: Date;
};

Verification.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  identifier: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE(3),
    allowNull: false
  }
},
{
  sequelize: db,
  modelName: 'verification',
  tableName: 'verification',
  timestamps: true,
  indexes: [
    {
      name: 'verification_identifier_idx',
      fields: ['identifier']
    }
  ]
});