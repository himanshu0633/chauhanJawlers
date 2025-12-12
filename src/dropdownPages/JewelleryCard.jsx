// JewelleryCard.jsx
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "../store/Action";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JewelleryCard = ({ product }) => {
  const dispatch = useDispatch();

  // wishlist check
  const wishlist = useSelector((state) => state.app.wishlist || []);
  const isWishlisted = wishlist.some((item) => item._id === product._id);

  // snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    // Show snackbar 🚀
    setOpenSnackbar(true);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <>
      <div className="jewel-card">
        <img src={product.image} alt={product.title} className="jewel-img" />

        <div className="jewel-content">
          <h3>{product.title}</h3>
          <p className="price">₹ {product.price}</p>

          <div className="actions">
            {/* Wishlist Icon */}
            <div className="wishlist-icon" onClick={handleWishlistToggle}>
              {isWishlisted ? (
                <FavoriteIcon className="wish-active" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </div>

            {/* Add to Cart Button */}
            <button className="cart-btn" onClick={handleAddToCart}>
              <ShoppingCartIcon /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar for Add to Cart */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Added to Cart Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default JewelleryCard;
