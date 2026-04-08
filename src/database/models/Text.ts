import { DataTypes, Model } from "sequelize";
import db from "../config";

export class Text extends Model {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare content?: string;
  declare userId: string;
};

Text.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255)
  },
  content: {
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
  modelName: 'text',
  tableName: 'text',
  timestamps: true,
  indexes: [
    {
      name: 'text_userId_idx',
      fields: ['userId']
    }
  ]
});