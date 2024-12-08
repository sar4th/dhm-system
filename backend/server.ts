
import app from "./app"; // Import the app configuration
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Get the port from environment variables, fallback to 5000 if not set
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
