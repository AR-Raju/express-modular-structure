import cors from "cors";
import express, { Application } from "express";
import { studentRoutes } from "./app/modules/student/student.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", studentRoutes);

export default app;
