import React from "react";
import { Box, Typography, Card, CardMedia, Button, styled } from "@mui/material";

// ---- Styled Components ----
// const ExperienceRoot = styled(Box)(({ theme }) => ({
//   padding: "60px 0 40px 0",
//   background: "#fff",
//   [theme.breakpoints.down("sm")]: {
//     padding: "22px 0 12px 0",
//   },
// }));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontWeight: 600,
  fontSize: 33,
  color: "#232323",
  lineHeight: 1.19,
  textAlign: "center",
  marginBottom: 5,
  [theme.breakpoints.down("sm")]: { fontSize: 22 },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "inherit",
  fontSize: 16,
  color: "#666",
  textAlign: "center",
  fontWeight: 400,
  marginBottom: 42,
  letterSpacing: ".02em",
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    marginBottom: 18,
  },
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "27px 30px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "1fr",
  maxWidth: 1100,
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "18px 18px",
    maxWidth: 600,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: 13,
    maxWidth: 375,
    width: "90vw",

  },
}));

// const ExpCard = styled(Card)(({ theme }) => ({
//   borderRadius: 19,
//   boxShadow: "0px 2px 15px 0 rgba(45,32,11,0.07)",
//   padding: 0,
//   position: "relative",
//   display: "flex",
//   flexDirection: "column",
//   // minHeight: 234,
//   cursor: "pointer",
//   transition: "transform .19s, box-shadow .18s",
//   "&:hover": {
//     transform: "translateY(-3px) scale(1.02)",
//     boxShadow:
//       "0 0 0 2px #deb886 inset, 0px 8px 22px 0px rgba(45,32,11,0.11)",
//   },
//   [theme.breakpoints.down("md")]: {
//     // minHeight: 190,
//     borderRadius: 14,
//   },
//   [theme.breakpoints.down("sm")]: {
//     // minHeight: 138,
//     borderRadius: 9,
//   },
// }));

const ExpMedia = styled(CardMedia)(({ theme }) => ({
  // height: 110,
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderTopLeftRadius: "inherit",
  borderTopRightRadius: "inherit",
  // [theme.breakpoints.down("sm")]: {
  //   // height: 67,
  // },
}));

const ExpTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontWeight: 600,
  textAlign: "center",
  fontSize: 17,
  margin: "20px 0 0 0",
  color: "#232323",
  marginBottom: 5,
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
    marginBottom: 3,
    marginTop: 0,
  },
}));
const DigiGoldCard = styled(Card)(() => ({
  borderRadius: 19,
  background: "#44170D",
  color: "#fff",
  minHeight: 210,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  textAlign: "center",
  boxShadow: "0 2px 15px 0 rgba(45,32,11,0.11)",
  padding: 0,
  width: "100%",
  // Sizes SAME as regular CardWrap
}));

const DigiLogo = styled("img")(({ theme }) => ({
  width: 58,
  height: 58,
  marginBottom: 7,
  marginTop: 10,
  objectFit: "contain",
  [theme.breakpoints.down("sm")]: { width: 36, height: 36, marginTop: 8, marginBottom: 4 }
}));

const DigiHeading = styled(Typography)({
  fontFamily: "serif",
  fontSize: 23,
  fontWeight: 700,
  color: "#fff",
  margin: "5px 0",
  lineHeight: 1.1,
  letterSpacing: 0.3,
});

const DigiPowered = styled(Typography)({
  fontSize: 13,
  color: "#fff",
  marginTop: 7,
  letterSpacing: 0.2,
  fontWeight: 400,
});


const ExperienceCards = [
  {
    key: "visit-store",
    image: "/experImg1.png",
    title: "VISIT OUR STORE",
  },
  {
    key: "jewellery-guide",
    image: "/experImg2.png",
    title: "JEWELLERY GUIDE",
  },
  {
    key: "digigold",
    title: "DIGI GOLD",
  },
  {
    key: "book-appointment",
    image: "/experImg4.png",
    title: "BOOK AN APPOINTMENT",
  },
  {
    key: "talk-expert",
    image: "/experImg5.png",
    title: "TALK TO AN EXPERT",
  },
  {
    key: "talk-expert",
    image: "/experImg6.png",
    title: "Blogs",
  },
  // {
  //   key: "silver",
  //   title: "SILVER"
  // },
];

export default function ChauhanExperience() {
  return (
    <Box sx={{ mb: 2 }}>
      < Title > Chauhan Son’s Experience</Title >
      <Subtitle>Find a Boutique or Book a Consultation</Subtitle>
      <GridWrap>
        {ExperienceCards.map(card => (
          card.key === "digigold" ? (
            <DigiGoldCard key="digigold" elevation={0}>
              <img src="/logo.svg" alt="Digi Gold Logo" />
              <DigiHeading>DIGITAL GOLD</DigiHeading>
              <DigiPowered>POWERED BY SAFE GOLD</DigiPowered>
            </DigiGoldCard>
          ) : card.key === "silver" ? (
            <DigiGoldCard key="silver" elevation={0}>
              <img src="/logo.svg" alt="Digi silver Logo" />
              <DigiHeading>DIGITAL Silver</DigiHeading>
              <DigiPowered>POWERED BY SAFE Silver</DigiPowered>
            </DigiGoldCard>
          ) : (
            <div>
              {/* <ExpCard key={card.key}> */}
              <ExpMedia
                component="img"
                image={card.image}
                alt={card.title}
                onError={(e) => {
                  e.target.src = "/placeholder-exp.jpg";
                }}
              />
              {/* </ExpCard> */}
              <ExpTitle>{card.title}</ExpTitle>
            </div>)
        ))}
      </GridWrap>
    </Box >
  );
}
