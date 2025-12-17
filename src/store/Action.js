// actions.js
import { toast } from "react-toastify";

// ---------------- CART ACTIONS ---------------------
export const addData = (data) => ({
  type: "ADD_DATA",
  payload: data,
});

export const updateCartItem = (updatedProduct) => ({
  type: "UPDATE_CART_ITEM",
  payload: updatedProduct,
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
// 🔥 UPDATED ADD TO CART — WITH TOAST + VARIANT CHECK + QTY INCREMENT
export const addToCart = (product) => (dispatch, getState) => {
  const cart = getState().app.data || []; // Get the current cart items

  // Create unique key based on the product id and variant (if any)
  const incomingKey = `${product._id}__${product.selectedVariant?.weight || ''}_${product.selectedVariant?.carat || ''}`;

  // Check if the product with the same variant is already in the cart
  const existingCartItem = cart.find((item) => {
    const itemKey = `${item._id}__${item.selectedVariant?.weight || ''}_${item.selectedVariant?.carat || ''}`;
    return itemKey === incomingKey;
  });

  if (existingCartItem) {
    // If the product already exists in the cart, increase its quantity
    const updatedProduct = {
      ...existingCartItem,
      cartQty: existingCartItem.cartQty + (product.cartQty || 1), // Increase quantity
    };

    // 🔴 CHANGE: Dispatch ADD_TO_CART instead of UPDATE_DATA
    dispatch({
      type: "ADD_TO_CART", // Use ADD_TO_CART to trigger toast
      payload: updatedProduct,
    });

    // 🔴 CHANGE: Show toast after dispatch
    toast.info("Quantity increased!", {
      position: "top-right",
      autoClose: 1500,
    });
  } else {
    // If the product is not in the cart, add it
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, cartQty: product.cartQty || 1 },
    });

    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
    });
  }
};

// ------------------ WISHLIST ACTIONS ---------------------
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
