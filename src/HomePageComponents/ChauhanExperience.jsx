import React from "react";
import { Box, Typography, Card, CardMedia, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  padding: "0 4px",
  [theme.breakpoints.down("md")]: {
    // gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px 18px",
    maxWidth: 700,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    maxWidth: 400,
  },

}));

const ExpMedia = styled(CardMedia)(({ theme }) => ({
  // height: 110,
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderTopLeftRadius: "inherit",
  borderTopRightRadius: "inherit",
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
const DigiGoldCard = styled(Card)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: { minHeight: 180, },
}));

const DigiHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontSize: 23,
  fontWeight: 700,
  color: "#fff",
  margin: "3px 0",
  lineHeight: 1.1,
  letterSpacing: 0.3,
  [theme.breakpoints.down("sm")]: { fontSize: 18 },
}));

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
    navigate: "/visit"
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
  const navigate = useNavigate();


  return (
    <Box sx={{ mb: 2, py: 5 }}>
      < Title > Chauhan Son’s Experience</Title >
      <Subtitle>Find a Boutique or Book a Consultation</Subtitle>
      <GridWrap>
        {ExperienceCards.map(card => (
          card.key === "digigold" ? (
            <DigiGoldCard key="digigold" elevation={0}>
              <img className="digiGoldLogoSize" src="/logo.svg" alt="Digi Gold Logo" />
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
                key={card.key}
                image={card.image}
                alt={card.title}
                // navigate={card.navigate}
                onClick={() => navigate(card.navigate)}
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
