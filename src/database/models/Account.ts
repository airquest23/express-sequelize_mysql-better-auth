import { DataTypes, Model } from "sequelize";
import db from "../config";

export class Account extends Model {
  declare id: string;
  declare accountId: string;
  declare providerId : string;
  declare userId: string;
  declare accessToken?: string;
  declare refreshToken?: string;
  declare idToken?: string;
  declare accessTokenExpiresAt?: Date;
  declare refreshTokenExpiresAt?: Date;
  declare scope?: string;
  declare password?: string;
};

Account.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  accountId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  providerId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  accessToken: {
    type: DataTypes.TEXT
  },
  refreshToken: {
    type: DataTypes.TEXT
  },
  idToken: {
    type: DataTypes.TEXT
  },
  accessTokenExpiresAt: {
    type: DataTypes.DATE(3)
  },
  refreshTokenExpiresAt: {
    type: DataTypes.DATE(3)
  },
  scope: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.TEXT
  }
},
{
  sequelize: db,
  modelName: 'account',
  tableName: 'account',
  timestamps: true,
  indexes: [
    {
      name: 'account_userId_idx',
      fields: ['userId']
    }
  ]
});