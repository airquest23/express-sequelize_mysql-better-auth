import { DataTypes, Model } from "sequelize";
import db from "../config";

export class Session extends Model {
  declare id: string;
  declare expiresAt: Date;
  declare token : string;
  declare ipAddres?: string;
  declare userAgent?: string;
  declare userId: string;
};

Session.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  expiresAt: {
    type: DataTypes.DATE(3),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  ipAddress: {
    type: DataTypes.TEXT
  },
  userAgent: {
    type: DataTypes.TEXT
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
  modelName: 'session',
  tableName: 'session',
  timestamps: true,
  indexes: [
    {
      name: 'session_userId_idx',
      fields: ['userId']
    }
  ]
});