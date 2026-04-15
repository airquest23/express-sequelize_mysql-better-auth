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
  declare image?: string;
  
  declare role: Role;
  
  declare emailVerified: boolean;
  declare twoFactorEnabled: boolean;
  declare twoFactorEmailOnly: boolean;
  declare banned: boolean;
  declare approved: boolean;
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
  image: {
    type: DataTypes.TEXT,
  },

  role: {
    type: DataTypes.ENUM(),
    values: ["user", "admin"],
    defaultValue: "user",
  },

  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  twoFactorEmailOnly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  banned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
},
{
  sequelize: db,
  modelName: 'user',
  tableName: 'user',
  timestamps: true,
});