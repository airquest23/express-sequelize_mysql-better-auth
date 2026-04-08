import { DataTypes, Model } from "sequelize";
import db from "../config";

export class RichText extends Model {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare content?: object;
  declare userId: string;
};

RichText.init({
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
    type: DataTypes.JSON
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
  modelName: 'richtext',
  tableName: 'richtext',
  timestamps: true,
  indexes: [
    {
      name: 'richtext_userId_idx',
      fields: ['userId']
    }
  ]
});