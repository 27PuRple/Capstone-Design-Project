import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/Item";
import "./models/Order";
dotenv.config();

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
