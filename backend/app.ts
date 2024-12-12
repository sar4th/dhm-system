import express, { Request, Response } from "express";
import dependencyRoutes from "./src/routes/dependencyRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
// Initialize express app
const app = express();

// Middleware
dotenv.config();
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(dependencyRoutes);
// Example route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Dependency Health Monitoring Tool Backend is working!");
});

// Export the app to be used in the server
export default app;
