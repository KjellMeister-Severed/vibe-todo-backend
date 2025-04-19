// models/Project.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index"; // adjust path as needed
import User from "./user";
import Task from "./task";

interface ProjectAttributes {
  id: number;
  name: string;
  description?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, "id">;

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
  }
);

export default Project;
