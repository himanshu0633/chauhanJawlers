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


// 🔥 UPDATED ADD TO CART — WITH TOAST + VARIANT CHECK + QTY INCREMENT
export const addToCart = (product) => (dispatch, getState) => {

  const cart = getState().app.data || [];

  // unique key check for variant
  const incomingKey = `${product._id}__${product.selectedVariant?.weight || ''}_${product.selectedVariant?.carat || ''}`;

  const exists = cart.some((item) => {
    const itemKey = `${item._id}__${item.selectedVariant?.weight || ''}_${item.selectedVariant?.carat || ''}`;
    return itemKey === incomingKey;
  });

  if (exists) {
    toast.info("Quantity increased!", {
      position: "top-right",
      autoClose: 1500,
    });
  } else {
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
    });
  }

  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  });
};




// ------------------ WISHLIST ACTIONS ---------------------

// 🔥 ADD TO WISHLIST WITH DUPLICATE CHECK
export const addToWishlist = (product) => (dispatch, getState) => {
  const wishlist = getState().app.wishlist || [];

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
