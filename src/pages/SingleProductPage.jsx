import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData, addToWishlist, removeFromWishlist ,  updateCartItem} from "../store/Action";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "@reduxjs/toolkit";
import ProductReviewsSection from "../Reviews/ProductReviewsSection";
import { publicUrl } from "../commonComponents/PublicUrl";
import axiosInstance from "../commonComponents/AxiosInstance";

export const selectWishlist = createSelector(
  [(state) => (Array.isArray(state.app?.wishlist) ? state.app.wishlist : [])],
  (wishlist) => {
    console.log('Wishlist selector called, items:', wishlist.length);
    return [...wishlist];
  }
);

  const parseVariants = (raw) => {
    try {
      let arr = raw;
      if (typeof arr === "string") arr = JSON.parse(arr);
      if (Array.isArray(arr) && arr.length === 1 && typeof arr[0] === "string") {
        arr = JSON.parse(arr[0]);
      }
      if (!Array.isArray(arr)) return [];
      return arr.map((v, i) => ({
        ...v,
        _key: v._key || `v-${i}`,
        label: v.label || "",
        mrp: v.mrp ? Number(v.mrp) : null,
        discount: v.discount ? Number(v.discount) : null,
        gst: v.gst ? Number(v.gst) : null,
        retail_price: v.retail_price ? Number(v.retail_price) : null,
        final_price: v.final_price
          ? Number(v.final_price)
          : v.finalPrice
          ? Number(v.finalPrice)
          : null,
        in_stock: v.in_stock ? String(v.in_stock).toLowerCase() === "yes" : false,
        weight: v.weight || "",
        carat: v.carat || "",
        pricePerGram: v.pricePerGram ? Number(v.pricePerGram) : null,
        makingPrice: v.makingPrice ? Number(v.makingPrice) : null,
        totalWeight: v.totalWeight ? Number(v.totalWeight) : null,
      }));
    } catch (e) {
      console.error("Error parsing variants:", e);
      return [];
    }
  };

const LocationSelector = () => {
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState("");

  const handleCheck = async () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    try {
      const addressResponse = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const addressData = await addressResponse.json();

      if (addressData[0].Status === "Success" && addressData[0].PostOffice) {
        const postOffice = addressData[0].PostOffice[0];
        const location = `${postOffice.District}, ${postOffice.State}`;
        setAddress(location);

        const deliveryDays = getDeliveryDays(pincode);
        setDeliveryInfo(`Delivery to ${location} in ${deliveryDays} days`);
        toast.success(`Delivery available to ${location}`);
      } else {
        setAddress("");
        setDeliveryInfo("Service not available for this pincode");
        toast.error("Service not available for this pincode");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setDeliveryInfo("Delivery in 5-7 business days");
      toast.info("Delivery in 5-7 business days");
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDays = (pincode) => {
    const firstDigit = parseInt(pincode[0]);
    if ([1, 2, 3].includes(firstDigit)) return "3-4";
    if ([4, 5, 6].includes(firstDigit)) return "5-7";
    return "7-10";
  };

  return (
    <div className="location-selector">
      <div className="pincode-input-container">
        <input
          value={pincode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setPincode(value);
            if (value.length !== 6) {
              setAddress("");
              setDeliveryInfo("");
            }
          }}
          placeholder="Enter 6 digit pincode"
          className="pincode-input"
          maxLength={6}
        />
        <button
          onClick={handleCheck}
          disabled={pincode.length !== 6 || loading}
          className="check-button"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {deliveryInfo && (
        <div className="delivery-info">
          <div className="delivery-text">{deliveryInfo}</div>
          {address && <div className="delivery-address">{address}</div>}
        </div>
      )}
    </div>
  );
};

export default function SingleProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const { id } = useParams();
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const [units, setUnits] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [wishlistUpdate, setWishlistUpdate] = useState(0);
  const cartItems = useSelector((state) => state.app.data);

  // Debug log to see wishlist state
  useEffect(() => {
    console.log('Current wishlist items:', wishlist);
  }, [wishlist]);

  const buyNow = () => {
    if (!product) return;
    const variant = product.quantity[selectedVariantIndex];
    if (!variant) return;

    const productWithVariant = {
      ...product,
      selectedVariant: variant,
      unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
      cartQty: units
    };

    navigate("/buy-now", { 
      state: { 
        product: productWithVariant, 
        units: units 
      } 
    });
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const variant = product?.quantity?.[selectedVariantIndex] || {};

  // Fix: Check if this exact product (by ID only) is in wishlist
  // Since your actions.js only checks by product._id
  const isWishlisted = wishlist.some(item => item._id === product?._id);

  const canAddToCart = Boolean(product?.stock === "yes");

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link."));
    }
  };

  // Updated to match your actions.js - only pass product._id
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    if (isWishlisted) {
      // Remove by product ID only (as per your actions.js)
      dispatch(removeFromWishlist(product._id));
      toast.info("Removed from Wishlist");
      setWishlistUpdate(prev => prev + 1);
    } else {
      // Add with variant info but store will only check by _id
      const variant = product.quantity[selectedVariantIndex];
      if (!variant) return;

      const wishlistItem = {
        ...product,
        _id: product._id,
        name: product.name,
        media: product.media || [],
        price: variant.final_price || variant.finalPrice || 0,
        // Include variant info for display purposes
        selectedVariant: {
          ...variant,
          _key: variant._key || `v-${selectedVariantIndex}`,
          weight: variant.weight || '',
          carat: variant.carat || '',
          final_price: variant.final_price || variant.finalPrice || 0,
        }
      };

      dispatch(addToWishlist(wishlistItem));
      toast.success("Added to Wishlist");
      setWishlistUpdate(prev => prev + 1);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/product/${id}`);
      const p = response.data;
      const variants = parseVariants(p.quantity);
      const fetchedProduct = {
        ...p,
        price: parseFloat(p.consumer_price),
        originalPrice: parseFloat(p.mrp),
        frontImage: publicUrl(p?.media[0]?.url) || "",
        sideImage: p?.media[1] ? publicUrl(p?.media[1]?.url) : "",
        quantity: variants,
        bestVariant: variants.find((v) => v.in_stock) || variants[0],
      };
      setProduct(fetchedProduct);
      if (fetchedProduct?.media?.length > 0) {
        setMainImage(publicUrl(fetchedProduct.media[0]?.url));
      }
      setSelectedVariantIndex(
        fetchedProduct.bestVariant
          ? variants.indexOf(fetchedProduct.bestVariant)
          : 0
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      console.warn("Product ID is undefined!");
      return;
    }
    fetchData();
  }, [id]);



const handleAddToCart = () => {
  if (!product) return;

  const variant = product.quantity[selectedVariantIndex]; // Get the selected variant

  // Check if the product already exists in the cart
  const existingCartItem = cartItems.find(
    (item) =>
      item._id === product._id && item.selectedVariant._key === variant._key
  );

  if (existingCartItem) {
    // If the product already exists in the cart, increase its quantity
    existingCartItem.cartQty += units; // Increase the quantity by the selected units

    // Dispatch action to update the cart with the new quantity
    dispatch(updateCartItem(existingCartItem));

    // Display toast that quantity was increased
    toast.info(`Quantity increased by ${units}!`, {
      position: "top-right",
      autoClose: 1500,
    });
  } else {
    // If the product is not in the cart, add it to the cart
    const cartItem = {
      ...product,
      selectedVariant: variant,
      cartQty: units,
      unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
    };

    dispatch(addData(cartItem)); // Dispatch action to add the product to cart
    toast.success("Item added to cart successfully!", {
      position: "top-right",
      autoClose: 1500,
    });
  }
};


  

  const increaseUnits = () => setUnits((prev) => prev + 1);
  const decreaseUnits = () => setUnits((prev) => (prev > 1 ? prev - 1 : 1));

  const selectedVariant = product?.quantity?.[selectedVariantIndex];
  const finalPrice =
    selectedVariant?.final_price ?? selectedVariant?.finalPrice;
  const gst = selectedVariant?.gst;
  const makingPrice = selectedVariant?.makingPrice;
  const pricePerGram = selectedVariant?.pricePerGram;
  const totalWeight = selectedVariant?.totalWeight;
  const discount = selectedVariant?.discount;
  const unitPrice = Number(
    selectedVariant?.final_price ?? selectedVariant?.finalPrice ?? 0
  );

  const subTotal =
    Number(pricePerGram) * Number(totalWeight) + Number(makingPrice);
  const discountAmount = discount ? subTotal * (Number(discount) / 100) : 0;
  const discountedValue = subTotal - discountAmount;
  const gstAmount = gst ? discountedValue * (Number(gst) / 100) : 0;

  const handleThumbnailClick = (imageUrl) => setMainImage(imageUrl);
  const handleTabChange = (tab) => setActiveTab(tab);

  if (loading) return <div className="loading-state">Loading...</div>;

  if (!product) return <div className="error-state">Product not found</div>;

  return (
    <div className="single-product-page">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />

      <div className="product-container">
        <div className="product-main">
          {/* Product Images Section */}
          <div className="product-images">
            <div
              className={`main-image-container ${isZoomed ? "zoomed" : ""}`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={mainImage}
                alt="Main product view"
                className={`main-image ${isZoomed ? "zoomed" : ""}`}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            </div>

            <div className="thumbnail-container">
              {product?.media?.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    mainImage === publicUrl(image?.url) ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(publicUrl(image?.url))}
                >
                  <img
                    src={publicUrl(image?.url)}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-img"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details">
            <div className="price-header">
              <div className="price-info">
                <h1 className="product-title">
                  ₹{" "}
                  {finalPrice
                    ? Number(finalPrice).toLocaleString("en-IN")
                    : "N/A"}
                </h1>
                {selectedVariant?.mrp && (
                  <h6 className="product-mrp">
                    MRP:{" "}
                    <span className="mrp-strike">
                      ₹ {Number(selectedVariant.mrp).toLocaleString("en-IN")}
                    </span>
                  </h6>
                )}
                <h2 className="product-collection">{product.name}</h2>
              </div>

              <div className="wishlist-share">
                <button
                  key={`wishlist-${wishlistUpdate}`}
                  className={`icon-button ${isWishlisted ? "wishlisted" : ""}`}
                  onClick={handleWishlistClick}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlisted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>

                <button className="icon-button" onClick={handleShare}>
                  🔗
                </button>
              </div>
            </div>

            {/* Variant Selector */}
            {product.quantity && product.quantity.length > 1 && (
              <div className="variant-selector">
                <div className="variant-label">Select Variant:</div>
                <div className="variant-options">
                  {product.quantity.map((variant, index) => (
                    <button
                      key={variant._key}
                      className={`variant-option ${
                        selectedVariantIndex === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedVariantIndex(index)}
                    >
                      {variant.weight ? `${variant.weight}g` : "Default"}
                      {variant.carat && ` • ${variant.carat}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

              {/* Variant Details */}
              {selectedVariant && (
                <div className="variant-details">
                  <div className="variant-detail-item">
                    <span className="detail-label">Weight:</span>
                    <span className="detail-value">
                      {selectedVariant.weight}g
                    </span>
                  </div>
                </div>
              )}

            {/* Product Badge */}
            <div className="pure-silver-badge">
              Made With Pure {selectedVariant?.carat || "925"} Silver
            </div>

            {/* Stock Status */}
            <div
              className={`stock-status ${
                product.stock === "yes" ? "in-stock" : "out-of-stock"
              }`}
            >
              {product.stock === "yes" ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <div className="quantity-label">Quantity:</div>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={decreaseUnits}>
                  -
                </button>
                <span className="quantity-value">{units}</span>
                <button className="quantity-btn" onClick={increaseUnits}>
                  +
                </button>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="delivery-section">
              <div className="delivery-label">Estimated Delivery Time</div>
              <LocationSelector />
            </div>

            {/* Features */}
            <div className="features">
              <div className="features-container">
                <div className="feature-column">
                  <div className="feature-item">
                    <div className="feature-icon">📦</div>
                    <div className="feature-text">
                      <div className="feature-title">Easy 20 Day Return</div>
                      <div className="feature-subtitle">Lifetime Exchange</div>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🛡️</div>
                    <div className="feature-text">
                      <div className="feature-title">6 Month Warranty</div>
                      <div className="feature-subtitle">Free 925 Silver</div>
                    </div>
                  </div>
                </div>

                <div className="feature-column">
                  <div className="feature-item">
                    <div className="feature-icon">🚚</div>
                    <div className="feature-text">
                      <div className="feature-title">Lifetime Plating</div>
                      <div className="feature-subtitle">Across India</div>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎁</div>
                    <div className="feature-text">
                      <div className="feature-title">Gift Wrap</div>
                      <div className="feature-subtitle">Add for ₹150</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="buy-now" onClick={buyNow}>
                Buy Now
              </button>
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
              >
                {canAddToCart ? "Add To Cart" : "Out of Stock"}
              </button>
            </div>

            {/* Enhanced Product Tabs - Version 1 */}
            <div className="product-tabs-v1">
              <div className="tabs-header">
                <button
                  className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                  onClick={() => handleTabChange("details")}
                >
                  <span className="tab-icon">📋</span>
                  <span className="tab-text">Product Details</span>
                  <span className="active-indicator"></span>
                </button>
                
                <button
                  className={`tab-button ${activeTab === "breakup" ? "active" : ""}`}
                  onClick={() => handleTabChange("breakup")}
                >
                  <span className="tab-icon">💰</span>
                  <span className="tab-text">Price Breakdown</span>
                  <span className="active-indicator"></span>
                </button>
                
                <button
                  className={`tab-button ${activeTab === "specs" ? "active" : ""}`}
                  onClick={() => handleTabChange("specs")}
                >
                  <span className="tab-icon">⚙️</span>
                  <span className="tab-text">Specifications</span>
                  <span className="active-indicator"></span>
                </button>
              </div>

              <div className="tab-content-wrapper">
                {activeTab === "details" && (
                  <div className="tab-content-card">
                    <div className="card-header">
                      <div className="card-icon">📋</div>
                      <h3 className="card-title">Product Details</h3>
                    </div>
                    <div className="details-grid">
                      <div className="detail-card">
                        <div className="detail-icon">🏷️</div>
                        <div className="detail-content">
                          <label>Product Name</label>
                          <span>{product.name}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">📁</div>
                        <div className="detail-content">
                          <label>Category</label>
                          <span>{product.category}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">🔍</div>
                        <div className="detail-content">
                          <label>Sub Category</label>
                          <span>{product.sub_category}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">🎉</div>
                        <div className="detail-content">
                          <label>Occasion</label>
                          <span>{product.occasion}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">👥</div>
                        <div className="detail-content">
                          <label>Gender</label>
                          <span>{product.genderVariety}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">⚖️</div>
                        <div className="detail-content">
                          <label>Price per gram</label>
                          <span>₹ {selectedVariant?.pricePerGram}/g</span>
                        </div>
                      </div>
                      
                      <div className="detail-card">
                        <div className="detail-icon">💎</div>
                        <div className="detail-content">
                          <label>Carat</label>
                          <span>{selectedVariant?.carat}</span>
                        </div>
                      </div>
                      
                      <div className="detail-card full-width">
                        <div className="detail-icon">📝</div>
                        <div className="detail-content">
                          <label>Description</label>
                          <span className="description-text">{product.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "breakup" && selectedVariant && (
                  <div className="tab-content-card">
                    <div className="card-header">
                      <div className="card-icon">💰</div>
                      <h3 className="card-title">Price Breakdown</h3>
                    </div>
                    <div className="price-breakup-card">
                      <div className="breakup-row">
                        <div className="breakup-info">
                          <div className="breakup-label">Silver Price</div>
                          <div className="breakup-subtext">
                            {pricePerGram}/g × {totalWeight}g
                          </div>
                        </div>
                        <div className="breakup-value">
                          ₹{(pricePerGram * totalWeight).toFixed(2)}
                        </div>
                      </div>
                      
                      {makingPrice > 0 && (
                        <div className="breakup-row">
                          <div className="breakup-info">
                            <div className="breakup-label">Making Charges</div>
                            <div className="breakup-subtext">Craftsmanship & design</div>
                          </div>
                          <div className="breakup-value">₹{makingPrice}</div>
                        </div>
                      )}
                      
                      <div className="breakup-divider"></div>
                      
                      <div className="breakup-row subtotal">
                        <div className="breakup-info">
                          <div className="breakup-label">Subtotal</div>
                        </div>
                        <div className="breakup-value">₹{subTotal.toFixed(2)}</div>
                      </div>
                      
                      {discount > 0 && (
                        <div className="breakup-row discount">
                          <div className="breakup-info">
                            <div className="breakup-label">
                              <span className="discount-badge">🎁</span>
                              Discount ({discount}%)
                            </div>
                          </div>
                          <div className="breakup-value">-₹{discountAmount.toFixed(2)}</div>
                        </div>
                      )}
                      
                      {gst > 0 && (
                        <div className="breakup-row">
                          <div className="breakup-info">
                            <div className="breakup-label">GST ({gst}%)</div>
                            <div className="breakup-subtext">Inclusive tax</div>
                          </div>
                          <div className="breakup-value">₹{gstAmount.toFixed(2)}</div>
                        </div>
                      )}
                      
                      <div className="breakup-divider"></div>
                      
                      <div className="breakup-row total">
                        <div className="breakup-info">
                          <div className="breakup-label">Grand Total</div>
                          <div className="breakup-subtext">Inclusive of all charges</div>
                        </div>
                        <div className="breakup-value">₹{Number(finalPrice).toFixed(2)}</div>
                      </div>
                      
                      {discount > 0 && (
                        <div className="savings-card">
                          <div className="savings-icon">💸</div>
                          <div className="savings-text">
                            You saved <strong>₹{discountAmount.toFixed(2)}</strong> on this order
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="tab-content-card">
                    <div className="card-header">
                      <div className="card-icon">⚙️</div>
                      <h3 className="card-title">Specifications</h3>
                    </div>
                    <div className="specs-grid">
                      <div className="spec-card">
                        <div className="spec-icon">🆔</div>
                        <div className="spec-content">
                          <label>Product ID</label>
                          <span className="spec-value">{product._id}</span>
                        </div>
                      </div>
                      
                      <div className="spec-card">
                        <div className="spec-icon">📁</div>
                        <div className="spec-content">
                          <label>Category</label>
                          <span>{product.category}</span>
                        </div>
                      </div>
                      
                      <div className="spec-card">
                        <div className="spec-icon">🔍</div>
                        <div className="spec-content">
                          <label>Sub Category</label>
                          <span>{product.sub_category}</span>
                        </div>
                      </div>
                      
                      <div className="spec-card">
                        <div className="spec-icon">📦</div>
                        <div className="spec-content">
                          <label>Stock Status</label>
                          <span className={`stock-badge ${product.stock === "yes" ? "in-stock" : "out-of-stock"}`}>
                            {product.stock === "yes" ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="spec-card">
                        <div className="spec-icon">⭐</div>
                        <div className="spec-content">
                          <label>Average Rating</label>
                          <span>{product.averageRating || "No ratings yet"}</span>
                        </div>
                      </div>
                      
                      <div className="spec-card">
                        <div className="spec-icon">💬</div>
                        <div className="spec-content">
                          <label>Total Reviews</label>
                          <span>{product.totalReviews}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            {product && (
              <div className="reviews-section">
                <ProductReviewsSection
                  product={product}
                  onRefreshProduct={fetchData}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .single-product-page {
          background-color: #fff;
          padding: 1rem 0;
          font-family: "Inter", sans-serif;
        }

        .product-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .product-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .product-images {
          width: 100%;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .main-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          height: 300px;
          cursor: pointer;
          width: 100%;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .main-image.zoomed {
          transform: scale(2);
        }

        .thumbnail-container {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-start;
          padding: 0.75rem;
          margin-top: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .thumbnail-container::-webkit-scrollbar {
          display: none;
        }

        .thumbnail {
          min-width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #e0e0e0;
          opacity: 0.7;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .thumbnail.active {
          border: 2px solid #44170d;
          opacity: 1;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .price-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .price-info {
          flex: 1;
        }

        .product-title {
          font-family: serif;
          font-weight: 700;
          font-size: 20px;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }

        .product-mrp {
          font-size: 11px;
          color: #666;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .mrp-strike {
          text-decoration: line-through;
          color: #999;
        }

        .product-collection {
          font-family: serif;
          font-weight: 400;
          font-size: 18px;
          color: #2c2c2c;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .wishlist-share {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease-in-out;
          font-size: 22px;
          position: relative;
        }

        .icon-button.wishlisted {
          border-color: #ff4757 !important;
          color: #ff4757 !important;
          background-color: rgba(255, 71, 87, 0.1) !important;
          animation: pulse 0.3s ease;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .icon-button:hover {
          background-color: #f5f5f5;
          transform: scale(1.05);
        }

        .icon-button.wishlisted:hover {
          background-color: rgba(255, 71, 87, 0.2);
        }

        .variant-selector {
          margin-bottom: 1rem;
        }

        .variant-label {
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.5rem;
        }

        .variant-options {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .variant-option {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 13px;
          white-space: nowrap;
        }

        .variant-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .variant-detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .detail-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .detail-value {
          font-size: 14px;
          color: #2c2c2c;
        }

        .pure-silver-badge {
          background-color: #f8f8f8;
          color: #2c2c2c;
          font-weight: 600;
          font-size: 13px;
          border: 1px solid #e0e0e0;
          padding: 8px 12px;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .stock-status {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 1rem;
          padding: 6px 10px;
          border-radius: 4px;
          display: inline-block;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .quantity-label {
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2c;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 4px;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
        }

        .delivery-section {
          margin-bottom: 1.5rem;
        }

        .delivery-label {
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 0.75rem;
        }

        .location-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .pincode-input-container {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .pincode-input {
          flex: 1;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
        }

        .check-button {
          background-color: #44170d;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
        }

        .features {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: #f8f8f8;
          border-radius: 8px;
        }

        .features-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: white;
          border-radius: 6px;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          position: sticky;
          bottom: 0;
          background: white;
          padding: 1rem 0;
          border-top: 1px solid #f0f0f0;
        }

        .add-to-cart,
        .buy-now {
          flex: 1;
          padding: 14px 16px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .add-to-cart {
          background-color: #44170d;
          color: #fff;
        }

        .buy-now {
          background-color: #2c2c2c;
          color: #fff;
        }

        /* Enhanced Product Tabs Styles */
        .product-tabs-v1 {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .product-tabs-v1 .tabs-header {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          padding: 0.5rem;
        }

        .product-tabs-v1 .tab-button {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          border-radius: 8px;
          margin: 0 0.25rem;
        }

        .product-tabs-v1 .tab-button.active {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .product-tabs-v1 .tab-button.active .active-indicator {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background: #44170d;
          border-radius: 2px;
        }

        .product-tabs-v1 .tab-icon {
          font-size: 1.25rem;
        }

        .product-tabs-v1 .tab-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #495057;
          white-space: nowrap;
        }

        .product-tabs-v1 .tab-button.active .tab-text {
          color: #44170d;
        }

        .tab-content-wrapper {
          padding: 0;
        }

        .tab-content-card {
          padding: 1.5rem;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .card-icon {
          font-size: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c2c2c;
          margin: 0;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .detail-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .detail-card:hover {
          background: #e9ecef;
          transform: translateY(-1px);
        }

        .detail-card.full-width {
          grid-column: 1 / -1;
        }

        .detail-icon {
          font-size: 1rem;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .detail-content {
          flex: 1;
        }

        .detail-content label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .detail-content span {
          display: block;
          font-size: 0.875rem;
          color: #2c2c2c;
          font-weight: 500;
        }

        .description-text {
          line-height: 1.5;
          color: #495057 !important;
        }

        /* Price Breakdown Styles */
        .price-breakup-card {
          max-width: 500px;
        }

        .breakup-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .breakup-row:last-child {
          border-bottom: none;
        }

        .breakup-info {
          flex: 1;
        }

        .breakup-label {
          font-weight: 500;
          color: #2c2c2c;
          margin-bottom: 0.25rem;
        }

        .breakup-subtext {
          font-size: 0.75rem;
          color: #6c757d;
        }

        .breakup-value {
          font-weight: 500;
          color: #2c2c2c;
        }

        .breakup-divider {
          height: 1px;
          background: #e9ecef;
          margin: 0.5rem 0;
        }

        .breakup-row.subtotal {
          border-bottom: 2px solid #e9ecef;
        }

        .breakup-row.subtotal .breakup-label {
          font-weight: 600;
        }

        .breakup-row.discount .breakup-label {
          color: #28a745;
        }

        .breakup-row.discount .breakup-value {
          color: #28a745;
        }

        .breakup-row.total {
          background: #f8f9fa;
          margin: 0 -1rem;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid #44170d;
        }

        .breakup-row.total .breakup-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #44170d;
        }

        .breakup-row.total .breakup-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #44170d;
        }

        .discount-badge {
          margin-right: 0.5rem;
        }

        .savings-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #d4edda, #c3e6cb);
          border: 1px solid #c3e6cb;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .savings-icon {
          font-size: 1.25rem;
        }

        .savings-text {
          font-size: 0.875rem;
          color: #155724;
          font-weight: 500;
        }

        /* Specs Grid */
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .specs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .spec-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .spec-icon {
          font-size: 1rem;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .spec-content {
          flex: 1;
        }

        .spec-content label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .spec-value {
          display: block;
          font-size: 0.875rem;
          color: #2c2c2c;
          font-weight: 500;
          word-break: break-all;
        }

        .stock-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .stock-badge.in-stock {
          background: #d4edda;
          color: #155724;
        }

        .stock-badge.out-of-stock {
          background: #f8d7da;
          color: #721c24;
        }

        .reviews-section {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        /* Tablet Styles */
        @media (min-width: 768px) {
          .single-product-page {
            padding: 2rem 0;
          }

          .product-main {
            flex-direction: row;
            gap: 3rem;
            margin-bottom: 4rem;
          }

          .product-images {
            width: 50%;
            position: sticky;
            top: 2rem;
            height: fit-content;
          }

          .product-details {
            width: 50%;
            padding-left: 2rem;
          }

          .main-image-container {
            height: 500px;
          }

          .thumbnail {
            width: 80px;
            height: 80px;
          }

          .product-title {
            font-size: 24px;
          }

          .product-collection {
            font-size: 20px;
          }

          .features-container {
            flex-direction: row;
            gap: 2rem;
          }

          .feature-column {
            flex: 1;
          }

          .action-buttons {
            position: static;
            background: transparent;
            border-top: none;
            padding: 0;
          }

          .product-tabs-v1 .tabs-header {
            flex-direction: row;
          }
        }

        /* Desktop Styles */
        @media (min-width: 1024px) {
          .main-image-container {
            height: 600px;
          }

          .main-image.zoomed {
            transform: scale(2.5);
          }

          .thumbnail-container {
            justify-content: center;
          }

          .action-buttons {
            flex-direction: row;
          }

          .details-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Large Desktop */
        @media (min-width: 1200px) {
          .product-container {
            padding: 0 2rem;
          }
        }

        /* Loading and Error States */
        .loading-state,
        .error-state {
          text-align: center;
          padding: 3rem 1rem;
          font-size: 1.1rem;
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .product-title {
            font-size: 18px;
          }
          
          .product-collection {
            font-size: 16px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .product-tabs-v1 .tabs-header {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
          }

          .product-tabs-v1 .tab-button {
            flex-direction: row;
            justify-content: flex-start;
            text-align: left;
            padding: 1rem;
          }

          .product-tabs-v1 .tab-button.active .active-indicator {
            bottom: 0;
            left: 0;
            transform: none;
            width: 3px;
            height: 100%;
          }

          .tab-content-card {
            padding: 1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .product-main {
            gap: 2rem;
          }
          
          .main-image-container {
            height: 450px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .product-main {
            flex-direction: row;
          }
          
          .product-images,
          .product-details {
            width: 50%;
          }
          
          .main-image-container {
            height: 300px;
          }
        }

        .in-stock {
          background: #d4edda;
          color: #155724;
        }

        .out-of-stock {
          background: #f8d7da;
          color: #721c24;
        }


          .thumbnail-container {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
    padding: 0.75rem;
    margin-top: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch; /* iOS smooth scrolling */
    height: 90px; /* Fixed height */
    min-height: 90px; /* Prevent collapse on iOS */
    align-items: center; /* Vertically center thumbnails */
  }
  
  /* iOS Safari specific fixes */
  @supports (-webkit-touch-callout: none) {
    .thumbnail-container {
      /* iOS Safari scroll fix */
      padding-bottom: 20px; /* Extra space for scroll */
      margin-bottom: -10px;
    }
    
    .thumbnail {
      -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
    }
    
    .thumbnail-img {
      -webkit-user-drag: none; /* Prevent image dragging */
    }
  }
  
  .thumbnail-container::-webkit-scrollbar {
    display: none;
  }
  
  .thumbnail {
    min-width: 70px;
    width: 70px;
    height: 70px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    opacity: 0.7;
    transition: all 0.2s ease;
    flex-shrink: 0;
    background-color: #fff; /* Ensure background on iOS */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .thumbnail.active {
    border: 2px solid #44170d;
    opacity: 1;
    transform: scale(1.05);
  }
  
  .thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* Remove extra space below image */
  }
  
  /* For touch devices */
  @media (hover: none) and (pointer: coarse) {
    .thumbnail {
      min-width: 75px; /* Larger touch target for mobile */
      width: 75px;
      height: 75px;
    }
    
    .thumbnail:active {
      opacity: 0.8;
      transform: scale(0.98);
    }
  }
  
  /* Tablet and Desktop adjustments */
  @media (min-width: 768px) {
    .thumbnail-container {
      justify-content: center;
      height: 100px;
      min-height: 100px;
    }
    
    .thumbnail {
      min-width: 80px;
      width: 80px;
      height: 80px;
    }
  }
  
  /* iOS device specific fixes */
  @media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2) {
    .thumbnail-container {
      /* Force hardware acceleration for smooth scrolling */
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    }
    
    .thumbnail {
      /* Prevent thumbnail text selection on iOS */
      -webkit-user-select: none;
      user-select: none;
    }
  }
  
  /* Fix for very old iOS versions */
  .thumbnail > img {
    -webkit-touch-callout: none;
  }

  .thumbnail-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(70px, auto);
  gap: 0.5rem;
  padding: 0.75rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  height: 90px;
}
  .thumbnail {
  touch-action: manipulation; /* Disable double-tap zoom */
}

/* Active state for touch devices */
.thumbnail.active:active {
  background-color: rgba(68, 23, 13, 0.1);
}


.thumbnail-container {
  scroll-snap-type: x mandatory;
}

.thumbnail {
  scroll-snap-align: start;
}


.thumbnail-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-overflow-scrolling: touch;
}

.thumbnail-img {
  -webkit-backface-visibility: hidden; /* Prevent flickering */
  backface-visibility: hidden;
}
      `}</style>
    </div>
  );
}