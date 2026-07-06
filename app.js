import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
import usersRouter from "./src/routes/users.router.js";
import authRouter from "./src/routes/auth.router.js";
import { auth } from "./src/middlewares/auth.middleware.js";


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando correctamente",
  });
});

app.use("/api/products", productsRouter);       //http://localhost:3000/api/products
app.use("/api/users", usersRouter);

app.use("/api/auth", authRouter);               //http://localhost:3000/api/auth/login
//body
//{
//  "email": "user@email.com",
//  "password": "strongPass123"
//}

app.get("/up", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor activo",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;