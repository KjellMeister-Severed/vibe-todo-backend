// models/User.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index"; // update path to your sequelize instance

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  spotifyAuthToken?: string;
  spotifyRefreshToken?: string;
  spotifyTokenExpiry?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public spotifyAuthToken?: string;
  public spotifyRefreshToken?: string;
  public spotifyTokenExpiry?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spotifyAuthToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spotifyRefreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spotifyTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "user" }
);

export default User;
