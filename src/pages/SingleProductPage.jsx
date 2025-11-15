import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData, addToWishlist, removeFromWishlist } from "../store/Action";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "@reduxjs/toolkit";
import ProductReviewsSection from "../Reviews/ProductReviewsSection";
import { publicUrl } from "../commonComponents/PublicUrl";
import axiosInstance from "../commonComponents/AxiosInstance";

export const selectWishlist = createSelector(
  [(state) => (Array.isArray(state.app?.wishlist) ? state.app.wishlist : [])],
  (wishlist) => [...wishlist]
);

// Cart Popup Component
const CartPopup = ({ product, variant, units, onClose, cartCount }) => {
  const navigate = useNavigate();

  const totalPrice = (variant?.final_price ?? variant?.finalPrice ?? 0) * units;

  const handleViewCart = () => {
    onClose();
    setTimeout(() => navigate("/cart"), 200);
  };

  const handleCheckout = () => {
    onClose();
    setTimeout(() => navigate("/checkout"), 200);
  };

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <div className="popup-header">
          <h3>✅ Item added to your cart</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="popup-content">
          <div className="popup-product">
            <img
              src={product?.frontImage}
              alt={product?.name}
              className="popup-image"
            />
            <div className="popup-details">
              <h4 className="popup-title">{product?.name}</h4>
              <p className="popup-variant">
                {variant?.weight && `${variant.weight}g`}
                {variant?.carat && ` • ${variant.carat}`}
              </p>
              <p className="popup-price">
                ₹ {totalPrice.toLocaleString("en-IN")}
              </p>
              <p className="popup-quantity">Quantity: {units}</p>
            </div>
          </div>
        </div>

        <div className="popup-actions">
          <button className="view-cart-btn" onClick={handleViewCart}>
            View cart
          </button>
        </div>
      </div>
    </div>
  );
};

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

// Accordion Component for Product Details
const ProductAccordion = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="accordion">
      <div className="accordion-summary" onClick={onToggle}>
        <div className="accordion-icon">{icon}</div>
        <div className="accordion-title">{title}</div>
        <div className="accordion-arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && <div className="accordion-details">{children}</div>}
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
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    breakup: false,
    specs: false,
  });

  const [showCartPopup, setShowCartPopup] = useState(false);

  const buyNow = () => {
    if (!product) return;
    const variant = product.quantity[selectedVariantIndex];
    if (!variant) return;

    const cartItem = {
      ...product,
      selectedVariant: variant,
      cartQty: units,
      unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
    };

    // Add to cart and navigate to buy page
    dispatch(addData(cartItem));
    setTimeout(() => navigate("/buy"), 200);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const variant = product?.quantity?.[selectedVariantIndex];
  const combinedId = `${product?._id}-${variant?.weight ?? "undef"}-${
    variant?.carat ?? "undef"
  }`;
  const isWishlisted = wishlist.some((item) => item._id === combinedId);
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

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const variant = product.quantity[selectedVariantIndex];
    const combinedId = `${product._id}-${variant.weight ?? "undef"}-${
      variant.carat ?? "undef"
    }`;
    const wishlistItem = {
      ...product,
      _id: combinedId,
      selectedVariant: { ...variant },
      price: variant.final_price ?? variant.finalPrice ?? 0,
    };
    if (wishlist.some((item) => item._id === combinedId)) {
      dispatch(removeFromWishlist(combinedId));
      toast.info("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(wishlistItem));
      toast.info("Added to Wishlist");
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
    const variant = product.quantity[selectedVariantIndex];
    if (!variant) return;
    const cartItem = {
      ...product,
      selectedVariant: variant,
      cartQty: units,
      unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
    };

    setShowCartPopup(true);
    dispatch(addData(cartItem));

    setTimeout(() => {
      setShowCartPopup(false);
    }, 5000);
  };

  const handleClosePopup = () => {
    setShowCartPopup(false);
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
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOpenAccordions({
      details: tab === "details",
      breakup: tab === "breakup",
      specs: tab === "specs",
    });
  };

  const toggleAccordion = (accordionKey) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [accordionKey]: !prev[accordionKey],
    }));
  };

  const cartCount = 3;

  if (loading) return <div className="loading-state">Loading...</div>;

  if (!product) return <div className="error-state">Product not found</div>;

  return (
    <div className="single-product-page">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />

      {showCartPopup && (
        <CartPopup
          product={product}
          variant={selectedVariant}
          units={units}
          onClose={handleClosePopup}
          cartCount={cartCount}
        />
      )}

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
                  className={`icon-button ${isWishlisted ? "wishlisted" : ""}`}
                  onClick={handleWishlistClick}
                >
                  {isWishlisted ? "❤️" : "🤍"}
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

            {/* Product Tabs */}
            <div className="product-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-button ${
                    activeTab === "details" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("details")}
                >
                  Product Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "breakup" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("breakup")}
                >
                  Price Breakdown
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "specs" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("specs")}
                >
                  Specifications
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "details" && (
                  <ProductAccordion
                    title="PRODUCT DETAILS"
                    icon="⚙️"
                    isOpen={openAccordions.details}
                    onToggle={() => toggleAccordion("details")}
                  >
                    <div className="details-grid">
                      <div className="detail-item">
                        <div className="detail-label">Product Name</div>
                        <div className="detail-value">{product.name}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Category</div>
                        <div className="detail-value">{product.category}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Sub Category</div>
                        <div className="detail-value">
                          {product.sub_category}
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Occasion</div>
                        <div className="detail-value">{product.occasion}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Gender</div>
                        <div className="detail-value">
                          {product.genderVariety}
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Price per gram:</div>
                        <div className="detail-value">
                          ₹ {selectedVariant.pricePerGram}/g
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Carat:</div>
                        <div className="detail-value">
                          {selectedVariant.carat}
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="detail-label">Material</div>
                        <div className="detail-value">
                          {product.productvariety}
                        </div>
                      </div>
                      <div className="detail-item full-width">
                        <div className="detail-label">Description</div>
                        <div className="detail-value">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </ProductAccordion>
                )}

                {activeTab === "breakup" && selectedVariant && (
                  <ProductAccordion
                    title="PRICE BREAKDOWN"
                    icon="💰"
                    isOpen={openAccordions.breakup}
                    onToggle={() => toggleAccordion("breakup")}
                  >
                    <div className="price-breakup-accordion">
                      {/* Silver Price */}
                      <div className="breakup-item">
                        <div className="breakup-left">
                          <div className="breakup-label">Silver Price</div>
                          <div className="breakup-description">
                            {pricePerGram}/g × {totalWeight}g
                          </div>
                        </div>
                        <div className="breakup-value">
                          ₹{Number(pricePerGram * totalWeight).toFixed(2)}
                        </div>
                      </div>

                      {/* Making Charges */}
                      {makingPrice > 0 && (
                        <div className="breakup-item">
                          <div className="breakup-left">
                            <div className="breakup-label">Making Charges</div>
                            <div className="breakup-description">
                              Craftsmanship & design charges
                            </div>
                          </div>
                          <div className="breakup-value">₹{makingPrice}</div>
                        </div>
                      )}

                      {/* Subtotal */}
                      <div className="breakup-item breakup-subtotal">
                        <div className="breakup-left">
                          <div className="breakup-label">Subtotal</div>
                        </div>
                        <div className="breakup-value">
                          ₹{subTotal.toFixed(2)}
                        </div>
                      </div>

                      {/* Discount */}
                      {discount > 0 && (
                        <div className="breakup-item breakup-discount">
                          <div className="breakup-left">
                            <div className="breakup-label">
                              <span className="discount-icon">🎁</span>
                              Discount ({discount}%)
                            </div>
                          </div>
                          <div className="breakup-value">
                            -₹{discountAmount.toFixed(2)}
                          </div>
                        </div>
                      )}

                      {/* GST */}
                      {gst > 0 && (
                        <div className="breakup-item">
                          <div className="breakup-left">
                            <div className="breakup-label">GST ({gst}%)</div>
                            <div className="breakup-description">
                              Inclusive tax
                            </div>
                          </div>
                          <div className="breakup-value">
                            ₹{gstAmount.toFixed(2)}
                          </div>
                        </div>
                      )}

                      {/* Grand Total */}
                      <div className="breakup-item breakup-total">
                        <div className="breakup-left">
                          <div className="breakup-label">Grand Total</div>
                          <div className="breakup-description">
                            Inclusive of all charges
                          </div>
                        </div>
                        <div className="breakup-value">
                          ₹{Number(finalPrice).toFixed(2)}
                        </div>
                      </div>

                      {/* Savings Info */}
                      {discount > 0 && (
                        <div className="savings-badge">
                          <span className="savings-icon">💸</span>
                          You save ₹{discountAmount.toFixed(2)} on this order
                        </div>
                      )}
                    </div>
                  </ProductAccordion>
                )}

                {activeTab === "specs" && (
                  <ProductAccordion
                    title="SPECIFICATIONS"
                    icon="📋"
                    isOpen={openAccordions.specs}
                    onToggle={() => toggleAccordion("specs")}
                  >
                    <div className="specs-accordion">
                      <div className="spec-item">
                        <div className="spec-label">Product ID</div>
                        <div className="spec-value">{product._id}</div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Category</div>
                        <div className="spec-value">{product.category}</div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Sub Category</div>
                        <div className="spec-value">{product.sub_category}</div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Occasion</div>
                        <div className="spec-value">{product.occasion}</div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Gender</div>
                        <div className="spec-value">
                          {product.genderVariety}
                        </div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Material</div>
                        <div className="spec-value">
                          {product.productvariety}
                        </div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Stock Status</div>
                        <div className="spec-value">
                          {product.stock === "yes"
                            ? "In Stock"
                            : "Out of Stock"}
                        </div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Average Rating</div>
                        <div className="spec-value">
                          {product.averageRating || "No ratings yet"}
                        </div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Total Reviews</div>
                        <div className="spec-value">{product.totalReviews}</div>
                      </div>
                    </div>
                  </ProductAccordion>
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

        /* Mobile First Styles */
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
          background: none;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 16px;
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

        .product-tabs {
          background-color: #fff;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          margin-bottom: 2rem;
        }

        .tabs-header {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .tabs-header::-webkit-scrollbar {
          display: none;
        }

        .tab-button {
          flex: 1;
          min-width: 120px;
          padding: 1rem 0.5rem;
          font-weight: 600;
          font-size: 14px;
          color: #666;
          background: none;
          border: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }

        .tab-content {
          padding: 1rem;
        }

        .accordion {
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .accordion-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 1rem;
          cursor: pointer;
          background-color: #f9f9f9;
        }

        .reviews-section {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        /* Cart Popup Mobile Styles */
        .cart-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .cart-popup {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          animation: slideUp 0.3s ease;
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

          .cart-popup-overlay {
            align-items: center;
            padding: 2rem;
          }

          .cart-popup {
            max-width: 450px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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

        /* Animations */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Utility Classes for Responsive Text */
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
          
          .tab-button {
            min-width: 110px;
            font-size: 13px;
            padding: 0.875rem 0.25rem;
          }
        }

        /* High-resolution devices */
        @media (min-width: 768px) and (max-width: 1024px) {
          .product-main {
            gap: 2rem;
          }
          
          .main-image-container {
            height: 450px;
          }
        }

        /* Landscape mobile */
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
      `}</style>
    </div>
  );
}