import { DataTypes, Model } from "sequelize";
import db from "../config";

enum Role {
  'user',
  'admin'
};

export class User extends Model {
  declare id: string;
  declare name: string;
  declare email : string;
  declare emailVerified: boolean;
  declare image?: string;
  declare twoFactorEnabled?: boolean;
  declare twoFactorEmailOnly?: boolean;
  declare role?: Role;
  declare isBanned?: boolean;
  declare isApproved: boolean;
};

User.init({
  id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
  },
  twoFactorEmailOnly: {
    type: DataTypes.BOOLEAN,
  },
  role: {
    type: DataTypes.ENUM(),
    values: ["user", "admin"],
    defaultValue: "user",
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    //allowNull: false,
    //defaultValue: process.env.BETTER_AUTH_FORCE_APPROVAL ? false : true,
  },
},
{
  sequelize: db,
  modelName: 'user',
  tableName: 'user',
  timestamps: true,
});