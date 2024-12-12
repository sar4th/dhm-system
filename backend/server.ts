import app from "./app";
import { connectDB } from "./src/config/db";
// Get the port from environment variables, fallback to 5000 if not set
const port = process.env.PORT || 5000;
console.log(process.env.DB_PASSWORD, "sssss");

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
