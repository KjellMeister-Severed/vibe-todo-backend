// models/Task.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  projectId: number;
  priority?: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCreationAttributes = Optional<TaskAttributes, "id" | "completed">;

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public deadline?: Date;
  public priority?: number;
  public projectId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: DataTypes.DATE,
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
