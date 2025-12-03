import { Box, Typography, Link, IconButton, styled, Container } from "@mui/material";
import { WhatsApp, Email, Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Theme from "../../Theme";

const FooterContainer = styled(Box)({
    // color: "#fff",
    color: Theme.palette.primary.contrastText,
    paddingTop: 30,
    paddingBottom: 15,
    fontFamily: "'Roboto', sans-serif",
});

const LogoAndDesc = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 280,
    marginBottom: 10,

    // Logo sizing
    img: {
        width: 120,   // adjust as required
        height: "auto",
    },

    "@media (max-width: 900px)": {
        maxWidth: "100%",
        marginBottom: 32,
    },
});


const CompanyDescription = styled(Typography)({
    fontSize: 14,
    lineHeight: 1.6,
    color: Theme.palette.primary.contrastText,
    maxWidth: "100%",
    "@media (max-width: 600px)": {
        fontSize: 13,
    },
});

const FooterSection = styled(Box)({
    display: "flex",
    flexDirection: "column",
    minWidth: 140,
    gap: 12,
    marginBottom: 10,
    "@media (max-width: 900px)": {
        minWidth: "auto",
        marginBottom: 12,
    },
});
const FooterSection1 = styled(Box)({
    display: "flex",
    flexDirection: "column",
    minWidth: 140,
    // gap: 12,
    marginBottom: 20,
    "@media (max-width: 900px)": {
        minWidth: "auto",
        marginBottom: 32,
    },
});

const SectionTitle = styled(Typography)({
    fontSize: 18,
    fontWeight: 600,
    // color: "#fff",
    color: Theme.palette.primary.contrastText,
    marginBottom: 16,
    "@media (max-width: 600px)": {
        fontSize: 16,
        marginBottom: 12,
    },
});

const FooterLink = styled(Link)({
    fontSize: 14,
    // color: "rgba(255,255,255,0.8)",
    color: Theme.palette.primary.contrastText,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
        color: "#FFD700",
        textDecoration: "none",
    },
    "@media (max-width: 600px)": {
        fontSize: 13,
    },
});

const ContactInfo = styled(Typography)({
    fontSize: 14,
    // color: "rgba(255,255,255,0.9)",
    color: Theme.palette.primary.contrastText,
    marginBottom: 8,
    "@media (max-width: 600px)": {
        fontSize: 13,
    },
});

const ChatSection = styled(Box)({
    marginTop: 2,
});

const ChatTitle = styled(Typography)({
    fontSize: 16,
    fontWeight: 600,
    // color: "#fff",
    color: Theme.palette.primary.contrastText,
    marginBottom: 1,
});

const ChatNumber = styled(Typography)({
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 2,
});

const SocialIcons = styled(Box)({
    display: "flex",
    gap: 8,
});

const SocialIcon = styled(IconButton)({
    backgroundColor: "rgba(255,255,255,0.1)",
    // color: "#fff",
    color: Theme.palette.primary.contrastText,
    width: 36,
    height: 36,
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.2)",
        color: "#FFD700",
    },
    padding: 0,
});

const BottomSection = styled(Box)({
    borderTop: "1px solid rgba(255,255,255,0.2)",
    marginTop: 10,
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 20,
    "@media (min-width: 601px)": {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

const SocialSection = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    "@media (max-width: 600px)": {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
    },
});

const SocialTitle = styled(Typography)({
    fontSize: 16,
    fontWeight: 500,
    // color: "#fff",
    color: Theme.palette.primary.contrastText,
});

const Copyright = styled(Typography)({
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
});


export default function Footer() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: Theme.palette.primary.main }}>
            <FooterContainer>
                <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
                    {/* Left: Logo and description */}
                    <LogoAndDesc>
                        <a href="/"><img src="/logo.svg" alt="logo" /></a>
                        <CompanyDescription>
                            Chauhan Sons Jewellers offers exquisite gold, diamond, and traditional jewellery with timeless craftsmanship and trusted quality for every occasion.
                        </CompanyDescription>
                    </LogoAndDesc>

                    <FooterSection>
                        <SectionTitle>Our Policy</SectionTitle>
                        <FooterLink onClick={() => navigate('/terms')}>Terms and Conditions</FooterLink>
                        <FooterLink onClick={() => navigate('/privacy')}>Privacy Policy</FooterLink>
                        <FooterLink onClick={() => navigate('/shipping')}>Shipping and Delivery Policy</FooterLink>
                        <FooterLink onClick={() => navigate('/return')}>Return, Refund and Cancellation Policy</FooterLink>
                        <FooterLink onClick={() => navigate('/contact')}>Contact us</FooterLink>
                    </FooterSection>

                    <FooterSection1 sx={{ minWidth: 220 }}>
                        <SectionTitle>Contact Us</SectionTitle>
                        <ChatTitle>Phone</ChatTitle>
                        <a href="tel: +91 9876535881">
                            <ContactInfo>+91 9876535881</ContactInfo></a>
                        <ChatTitle>Email</ChatTitle>
                        <a href="mailto:chauhansons69@yahoo.com" > <ContactInfo> chauhansons69@yahoo.com </ContactInfo></a>
                        <ChatTitle>Address</ChatTitle>
                        <ContactInfo>  CHAUHAN SONS JEWELLER S.C.F 74 <br /> PHASE 5  SECTOR 59 , <br /> Sahibzada Ajit Singh Nagar,<br /> PUNJAB 160059,INDIA</ContactInfo>
                        {/* <ChatSection>
                            <ChatTitle>Chat With Us</ChatTitle>
                            <ChatNumber>+91 9876535881</ChatNumber>
                            <SocialIcons>
                                <SocialIcon aria-label="WhatsApp">
                                    <WhatsApp fontSize="small" />
                                </SocialIcon>
                                <SocialIcon aria-label="Email">
                                    <Email fontSize="small" />
                                </SocialIcon>
                            </SocialIcons>
                        </ChatSection> */}
                    </FooterSection1>
                </Container>
                {/* Bottom Section */}
                <Container maxWidth="xl">
                    <BottomSection>
                        <SocialSection>
                            <SocialTitle>Social</SocialTitle>
                            {/* <SocialIcons>
                                {[Facebook, Instagram, Twitter, YouTube].map((IconComp, idx) => (
                                    <SocialIcon key={idx} aria-label={IconComp.displayName || "social-icon"}>
                                        <IconComp fontSize="small" />
                                    </SocialIcon>
                                ))}
                            </SocialIcons> */}

                            <SocialIcons>
                                <SocialIcon aria-label="Facebook">
                                    <Facebook fontSize="small" />
                                </SocialIcon>
                                <SocialIcon aria-label="Instagram">
                                    <a style={{color:Theme.palette.primary.contrastText}} target="blank" href="https://www.instagram.com/chauhansonsjewellers/?hl=en">
                                        <Instagram fontSize="small" />
                                    </a>
                                </SocialIcon>
                                <SocialIcon aria-label="Twitter">
                                    <Twitter fontSize="small" />
                                </SocialIcon>
                                <SocialIcon aria-label="YouTube">
                                    <YouTube fontSize="small" />
                                </SocialIcon>
                            </SocialIcons>

                        </SocialSection>
                        {/* <FooterLinksRow>
                            {["Terms & Conditions", "Privacy Policy"].map((text) => (
                                <BottomLink key={text}>{text}</BottomLink>
                            ))}
                        </FooterLinksRow> */}
                        <Copyright> <a className="text-white" target="blank" href="https://careerinfowisitsolution.com/">Crafted With ❤ by CIIS - Career Infowis IT Solutions Pvt Ltd</a></Copyright>
                        <Copyright>© {new Date().getFullYear()} Chauhan Son's Company Limited. All Rights Reserved.</Copyright>
                    </BottomSection>
                </Container>
            </FooterContainer>
        </div>
    );
}
