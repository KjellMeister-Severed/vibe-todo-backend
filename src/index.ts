import express from "express";
import { sequelize } from "./models";
import authRoutes from "./routes/auth.routes";
import User from "./models/user";
import Project from "./models/project";
import Task from "./models/task";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Mr. Loser’s backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });

// Project associations
Project.belongsTo(User, { foreignKey: "userId" });
Project.hasMany(Task, { foreignKey: "projectId", onDelete: "CASCADE" });

// Task associations
Task.belongsTo(Project, { foreignKey: "projectId" });
Task.belongsTo(User, { foreignKey: "userId" });

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ alter: true }); // Set to true to drop and recreate tables
    console.log("Database connected.");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
