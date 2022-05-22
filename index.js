import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createRequire } from "module";
import ticketRoutes from "./routes/ticketRoutes.js";
import swaggerDocs from "./utils/swagger.js";

const require = createRequire(import.meta.url);
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/tickets", ticketRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  // .then(() =>
  //   app.listen(PORT, () => {
  //     console.log(`Server running on port: ${PORT}`);
  //     swaggerDocs(app, PORT);
  //   })
  // )
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  swaggerDocs(app, PORT);
});
