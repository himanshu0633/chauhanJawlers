// // store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';

const initialState = {
    data: [],
    wishlist: []
};

const saveState = (data) => {
    localStorage.setItem("reduxState", JSON.stringify(data.data));
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            const newState = {
                ...state,
                data: [...state.data, action.payload],
            };
            saveState(newState);
            return newState;
        case "DELETE_PRODUCT":
            const newState1 = {
                ...state,
                data: state.data.filter((product) => product._id !== action.payload),
            };
            saveState(newState1);
            return newState1;
        case "CLEAR_PRODUCT":
            const newState2 = {
                ...state,
                data: action.payload,
            };
            saveState(newState2);
            return newState2;
        case "CLEAR_ALLPRODUCT":
            const updatedState = {
                ...state,
                data: [],
            };
            saveState(updatedState);
            return updatedState;
        case "UPDATE_DATA":
            const updatedData = state.data.map((product) =>
                product._id === action.payload._id ? action.payload : product
            );
            const newState3 = {
                ...state,
                data: updatedData,
            };
            saveState(newState3);
            return newState3;
        case "ADD_TO_WISHLIST":
            const currentWishlist = Array.isArray(state.wishlist) ? state.wishlist : [];
            if (currentWishlist.some(item => item._id === action.payload._id)) {
                return state;
            }
            return { ...state, wishlist: [...currentWishlist, action.payload] };

        case "REMOVE_FROM_WISHLIST":
            return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload) };
        case "CLEAR_WISHLIST":
            return { ...state, wishlist: [] };
        // case "ADD_TO_CART":
        //     const currentCart = Array.isArray(state.data) ? state.data : [];
        //     if (currentCart.some(item => item._id === action.payload._id)) {
        //         return state; // To prevent duplicate cart items, optionally update quantity instead
        //     }
        //     return { ...state, data: [...currentCart, action.payload] };

        case "ADD_TO_CART":
            const cart = Array.isArray(state.data) ? state.data : [];

            const itemIndex = cart.findIndex(item => item._id === action.payload._id);
            if (itemIndex !== -1) {
                const updatedCart = [...cart];
                const existingItem = updatedCart[itemIndex];
                updatedCart[itemIndex] = {
                    ...existingItem,
                    cartQty: (existingItem.cartQty || 1) + 1,  // increment quantity
                };
                return { ...state, data: updatedCart };
            }
            return { ...state, data: [...cart, { ...action.payload, cartQty: 1 }] };


        default:
            return state;
    }
};

// Combine reducers (only one here, but necessary for persistReducer)
const root = combineReducers({
    app: rootReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, root);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };

