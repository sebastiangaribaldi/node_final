import db from "../config/firebase.js";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

// CRUD - Create, Read, Update, Delete

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  const products = [];

  snapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return products;
};

export const getProductById = async (id) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const updateProduct = async (id, product) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  await updateDoc(productRef, product);

  return {
    id: productRef.id,
    ...product,
  };
};

export const createProduct = async (product) => {
  const productRef = await addDoc(productsCollection, product);

  return {
    id: productRef.id,
    ...product,
  };
};

export const deleteProduct = async (id) => {
  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  const deletedProduct = {
    id: snapshot.id,
    ...snapshot.data(),
  };

  await deleteDoc(productRef);

  return deletedProduct;
};