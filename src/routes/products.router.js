import { Router } from "express";

const router = Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

// Prefijo: /api/products

router.post("/", auth, createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", auth, updateProduct);

router.delete("/:id", auth, deleteProduct);

export default router;


//Para poder crear, actualizar y eliminar productos, se requiere autenticación mediante un token JWT. 
//Hay que enviar en Auth el Bearer token.