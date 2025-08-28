// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const products = [
//     { id: 1, name: "Dailywear Earrings", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwf6681d67/images/hi-res/502994SFPADA09_1.jpg?sw=480&sh=480" },
//     { id: 2, name: "Dailywear Mangalsutra", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8dba9897/images/hi-res/510449PAAAAA00.jpg?sw=480&sh=480" },
//     { id: 3, name: "Dailywear Pendants", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw908fe0fa/images/hi-res/511920FCMAA00.jpg?sw=480&sh=480" },
//     { id: 4, name: "Dailywear Rings", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwf6681d67/images/hi-res/502994SFPADA09_1.jpg?sw=480&sh=480" },
//     { id: 5, name: "Dailywear Bracelets", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwf6681d67/images/hi-res/502994SFPADA09_1.jpg?sw=480&sh=480" },
//     { id: 6, name: "Dailywear Chains", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwf6681d67/images/hi-res/502994SFPADA09_1.jpg?sw=480&sh=480" },
// ];



// const Arrow = ({ className, style, onClick, isLeft }) => (
//     <div
//         className={className}
//         style={{
//             ...style,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             // background: "rgba(255,255,255,0.3)",
//             borderRadius: "50%",
//             // width: 40,
//             // height: 40,
//             zIndex: 2,
//             top: "42%",
//             [isLeft ? "left" : "right"]: "-80px",
//         }}
//         onClick={onClick}
//     />
// );

// const SlickSlider = () => {
//     const settings = {
//         dots: false,
//         arrows: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <Arrow isLeft={false} />,
//         prevArrow: <Arrow isLeft={true} />,
//         responsive: [
//             {
//                 breakpoint: 1024, // tablets
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 600, // phones
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     };

//     return (
//         <div style={{ marginBottom: 40 }}>
//             <div style={{ background: "linear-gradient(135deg, #7B1538, #501218)", padding: "40px 0" }}>
//                 <h2 style={{ color: "#fff", textAlign: "center", fontFamily: "serif", marginBottom: 40 }}>
//                     Dailywear Jewellery
//                 </h2>
//                 <div style={{ maxWidth: 1050, margin: "0 auto", padding: "0 20px" }}>
//                     <Slider {...settings}>
//                         {products.map((product) => (
//                             <div key={product.id} onClick={() => console.log(`${product.name} clicked`)}>
//                                 <div
//                                     style={{
//                                         background: "#fff4ec",
//                                         borderRadius: 16,
//                                         overflow: "hidden",
//                                         margin: "0 10px",
//                                         cursor: "pointer",
//                                         textAlign: "center",
//                                     }}
//                                 >
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         style={{ width: "100%", height: 220, objectFit: "cover" }}
//                                         onError={(e) => {
//                                             e.target.src = "/placeholder.svg?text=Image+Not+Found";
//                                         }}
//                                         loading="lazy"
//                                     />
//                                     <h4 style={{ margin: "12px 0", color: "#4a111d", fontFamily: "serif" }}>
//                                         {product.name}
//                                     </h4>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SlickSlider;



// // 2: slider for dailywear category api:
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance";
import { publicUrl } from "./PublicUrl";


const Arrow = ({ className, style, onClick, isLeft }) => (
    <div
        className={className}
        style={{
            ...style,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // background: "rgba(255,255,255,0.3)",
            borderRadius: "50%",
            // width: 40,
            // height: 40,
            zIndex: 2,
            top: "42%",
            [isLeft ? "left" : "right"]: "-80px",
        }}
        onClick={onClick}
    />
);

const SlickSlider = () => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [comparedCategory, setComparedCategory] = useState([])

    useEffect(() => {
        fetchCategory();
        fetchAllProducts();
        compareCategories();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/user/allcategories`);
            setCategoryName(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false)
        }
    };
    const fetchAllProducts = async () => {
        try {
            const response = await axiosInstance.get(`/user/allproducts`);
            setProducts(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false)
        }
    };

    const compareCategories = () => {

        if (products.category === categoryName.name) {
            console.log("00", products.category)
        }
    }

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <Arrow isLeft={false} />,
        prevArrow: <Arrow isLeft={true} />,
        responsive: [
            {
                breakpoint: 1024, // tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // phones
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div style={{ marginBottom: 40 }}>
            <div style={{ background: "linear-gradient(135deg, #7B1538, #501218)", padding: "40px 0" }}>
                <h2 style={{ color: "#fff", textAlign: "center", fontFamily: "serif", marginBottom: 40 }}>
                    Dailywear Jewellery
                </h2>
                <div style={{ maxWidth: 1050, margin: "0 auto", padding: "0 20px" }}>
                    <Slider {...settings}>
                        {categoryName.map((product) => (
                            <div key={product.id} onClick={() => console.log(`${product.name} clicked`)}>
                                <div
                                    style={{
                                        background: "#fff4ec",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        margin: "0 10px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                    }}
                                >
                                    <img
                                        // src={product.image}
                                        src={publicUrl(product.image)}
                                        alt={product.name}
                                        style={{ width: "100%", height: 220, objectFit: "cover" }}
                                        onError={(e) => {
                                            e.target.src = "/placeholder.svg?text=Image+Not+Found";
                                        }}
                                        loading="lazy"
                                    />
                                    <h4 style={{ margin: "12px 0", color: "#4a111d", fontFamily: "serif" }}>
                                        {product.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default SlickSlider;

