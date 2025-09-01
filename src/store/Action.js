// actions.js
export const addData = (data) => ({
    type: 'ADD_DATA',
    payload: data,
});

export const deleteProduct = (productId) => ({
    type: 'DELETE_PRODUCT',
    payload: productId,
});

export const clearProduct = (productId) => ({
    type: 'CLEAR_PRODUCT',
    payload: [],
});

export const clearProducts = () => ({
    type: 'CLEAR_ALLPRODUCT',
});

export const updateData = (updatedProduct) => ({
    type: 'UPDATE_DATA',
    payload: updatedProduct,
});

export const addToWishlist = (product) => ({
    type: 'ADD_TO_WISHLIST',
    payload: product,
});
export const removeFromWishlist = (productId) => ({
    type: 'REMOVE_FROM_WISHLIST',
    payload: productId,
});
export const clearWishlist = () => ({
    type: 'CLEAR_WISHLIST',
});
