import express, { Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies

// Example route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Dependency Health Monitoring Tool Backend is working!");
});

// Example API route (you can replace this with your actual routes)
app.get("/api/status", (req: Request, res: Response) => {
  res.json({ status: "Healthy" });
});

// Export the app to be used in the server
export default app;
