// actions.js
import { toast } from "react-toastify";

// ---------------- CART ACTIONS ---------------------
export const addData = (data) => ({
  type: "ADD_DATA",
  payload: data,
});

export const deleteProduct = (productId) => ({
  type: "DELETE_PRODUCT",
  payload: productId,
});

export const clearProduct = () => ({
  type: "CLEAR_PRODUCT",
  payload: [],
});

export const clearProducts = () => ({
  type: "CLEAR_ALLPRODUCT",
});

export const updateData = (updatedProduct) => ({
  type: "UPDATE_DATA",
  payload: updatedProduct,
});

export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});


// ------------------ WISHLIST ACTIONS ---------------------

// 🔥 ADD TO WISHLIST WITH DUPLICATE CHECK (IMPORTANT)
export const addToWishlist = (product) => (dispatch, getState) => {
  const wishlist = getState().app.wishlist || [];

  // Check if already exists
  const alreadyExists = wishlist.some(
    (item) => item._id === product._id
  );

  if (alreadyExists) {
    toast.info("Product already in wishlist!", {
      position: "top-right",
      autoClose: 1500,
    });
    return;
  }

  dispatch({
    type: "ADD_TO_WISHLIST",
    payload: product,
  });

  toast.success("Added to wishlist!", {
    position: "top-right",
    autoClose: 1500,
  });
};


// REMOVE FROM WISHLIST
export const removeFromWishlist = (productId) => ({
  type: "REMOVE_FROM_WISHLIST",
  payload: productId,
});

export const clearWishlist = () => ({
  type: "CLEAR_WISHLIST",
});
