import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure());
  }
};
export const deleteProduct = async (dispatch, title) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${title}`);
    dispatch(deleteProductSuccess(title));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (dispatch, products, updatedProduct) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${updatedProduct._id}`, {
      ...updatedProduct,
    });
    const updatedProducts = products.map((p) =>
      p._id === updatedProduct._id ? updatedProduct : p
    );
    dispatch(updateProductSuccess(updatedProducts));
  } catch (error) {
    console.log(error.message);
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    console.log(error.message);
    dispatch(addProductFailure());
  }
};
