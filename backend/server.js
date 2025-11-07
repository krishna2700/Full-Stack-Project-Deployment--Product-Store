import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // to parse JSON request bodies

app.get("/", (req, res) => res.send("Server is ready!"));

const PORT = process.env.PORT;

app.use("/api/products", ProductRoutes);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });
