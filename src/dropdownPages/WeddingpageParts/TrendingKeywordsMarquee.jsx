import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { Diamond } from "@mui/icons-material";
import { Fade } from "@mui/material";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const TrendingKeywordsMarquee = ({ trigger, trendingItems, trendingImages }) => {
    const [hoveredKeyword, setHoveredKeyword] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Diamond sx={{
                    fontSize: "2.5rem",
                    color: "#8B1538",
                    animation: `${float} 4s ease-in-out infinite`
                }} />
            </Box>

            <Fade in={trigger} timeout={800}>
                <Typography variant="h4" component="h2" sx={{
                    textAlign: "center",
                    mb: 6,
                    fontWeight: 500,
                    color: "#8B1538",
                    fontFamily: '"Playfair Display", serif',
                    position: "relative"
                }}>
                    What others are looking for
                </Typography>
            </Fade>

            <Box sx={{
                background: "linear-gradient(135deg, #f8e8ef 0%, #fff 30%, #f0f8ff 70%, #f8e8ef 100%)",
                backgroundSize: "400% 400%",
                animation: `${gradientShift} 8s ease infinite`,
                borderRadius: 4,
                py: 6,
                px: 0,
                mb: 4,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 8px 32px rgba(139,21,56,0.12)",
                border: "1px solid rgba(212,175,55,0.2)"
            }}>
                {Array.from({ length: 6 }).map((_, rowIdx) => {
                    const repeatedItems = Array(4).fill(trendingItems).flat();
                    return (
                        <Box key={`marquee-row-${rowIdx}`} sx={{
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            animation: `${rowIdx % 2 === 0 ? "marquee-left" : "marquee-right"} ${20 + rowIdx * 2}s linear infinite`,
                            mb: rowIdx === 5 ? 0 : 1,
                            "@keyframes marquee-left": {
                                "0%": { transform: "translateX(0%)" },
                                "100%": { transform: "translateX(-50%)" }
                            },
                            "@keyframes marquee-right": {
                                "0%": { transform: "translateX(-50%)" },
                                "100%": { transform: "translateX(0%)" }
                            }
                        }}>
                            {repeatedItems.map((item, colIdx) => (
                                <Typography key={`marquee-${rowIdx}-${colIdx}`} variant="h6" sx={{
                                    fontFamily: colIdx % 3 === 0
                                        ? "Dancing Script, cursive"
                                        : colIdx % 3 === 1
                                            ? "Playfair Display, serif"
                                            : "Georgia, serif",
                                    fontWeight: colIdx % 3 === 0
                                        ? 700
                                        : colIdx % 3 === 1
                                            ? 500
                                            : 600,
                                    fontSize: { xs: "1.2rem", md: "1.6rem" },
                                    color: rowIdx % 2 === 0 ? "#8B1538" : "#2C5530",
                                    mx: { xs: 2, md: 4 },
                                    cursor: "pointer",
                                    position: "relative",
                                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                    "&:hover": {
                                        color: "#d4af37",
                                        transform: "scale(1.15) rotate(2deg)",
                                        textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                                        zIndex: 10
                                    }
                                }}
                                    onMouseEnter={(e) => {
                                        const rect = e.target.getBoundingClientRect();
                                        setHoveredKeyword(item);
                                        setHoveredPosition({
                                            x: rect.left + rect.width / 2,
                                            y: rect.top
                                        });
                                    }}
                                    onMouseLeave={() => setHoveredKeyword(null)}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                    );
                })}

                {hoveredKeyword && trendingImages[hoveredKeyword] && (
                    <Box sx={{
                        position: "fixed",
                        top: hoveredPosition.y - 180,
                        left: hoveredPosition.x - 100,
                        zIndex: 2000,
                        pointerEvents: "none",
                        animation: `${float} 4s ease-in-out infinite`,
                        filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))"
                    }}>
                        <Box sx={{ position: "relative", transform: "rotate(-3deg)" }}>
                            <img
                                src={trendingImages[hoveredKeyword]}
                                alt={hoveredKeyword}
                                style={{
                                    width: 200,
                                    height: 140,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    border: "3px solid #fff",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
                                }}
                            />
                            <Box sx={{
                                position: "absolute",
                                bottom: -25,
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "linear-gradient(135deg, #8B1538, #6B1028)",
                                color: "#fff",
                                px: 3,
                                py: 1,
                                borderRadius: 20,
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                fontFamily: '"Playfair Display", serif',
                                boxShadow: "0 4px 16px rgba(139,21,56,0.3)",
                                border: "2px solid rgba(255,255,255,0.2)"
                            }}>
                                {hoveredKeyword}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default TrendingKeywordsMarquee;