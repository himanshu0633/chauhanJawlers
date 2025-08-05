import { Box, Typography, Link, IconButton, styled, Container } from "@mui/material";
import { WhatsApp, Email, Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const FooterContainer = styled(Box)({
    color: "#fff",
    paddingTop: 60,
    paddingBottom: 30,
    fontFamily: "'Roboto', sans-serif",
});

const LogoAndDesc = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 280,
    marginBottom: 40,
    "@media (max-width: 900px)": {
        maxWidth: "100%",
        marginBottom: 32,
    },
});


const CompanyDescription = styled(Typography)({
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.9)",
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
    marginBottom: 40,
    "@media (max-width: 900px)": {
        minWidth: "auto",
        marginBottom: 32,
    },
});

const SectionTitle = styled(Typography)({
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    marginBottom: 16,
    "@media (max-width: 600px)": {
        fontSize: 16,
        marginBottom: 12,
    },
});

const FooterLink = styled(Link)({
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
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
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    "@media (max-width: 600px)": {
        fontSize: 13,
    },
});

const ChatSection = styled(Box)({
    marginTop: 16,
});

const ChatTitle = styled(Typography)({
    fontSize: 16,
    fontWeight: 500,
    color: "#fff",
    marginBottom: 8,
});

const ChatNumber = styled(Typography)({
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 12,
});

const SocialIcons = styled(Box)({
    display: "flex",
    gap: 8,
});

const SocialIcon = styled(IconButton)({
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
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
    marginTop: 40,
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
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
    color: "#fff",
});

const FooterLinksRow = styled(Box)({
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    "@media (max-width: 600px)": {
        gap: 16,
    },
});

const BottomLink = styled(Link)({
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": {
        color: "#FFD700",
        textDecoration: "none",
    },
});

const Copyright = styled(Typography)({
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    whiteSpace: "nowrap",
});


export default function Footer() {
    return (
        <div className="primary_Bgclr">
            <FooterContainer>
                <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
                    {/* Left: Logo and description */}
                    <LogoAndDesc>
                        <div><img src="/logo.svg" alt="logo" /></div>
                        <CompanyDescription>
                            Chauhan Sons Jewellers offers exquisite gold, diamond, and traditional jewellery with timeless craftsmanship and trusted quality for every occasion.
                        </CompanyDescription>
                    </LogoAndDesc>
                    {/* Useful Links */}
                    <FooterSection>
                        <SectionTitle>Useful Links</SectionTitle>
                        {["Delivery Information", "International Shipping", "Payment Options", "Track Your Order", "Returns", "Find a Store"].map((text) => (
                            <FooterLink key={text}>{text}</FooterLink>
                        ))}
                    </FooterSection>
                    {/* Information */}
                    <FooterSection>
                        <SectionTitle>Information</SectionTitle>
                        {["Blog", "Offers & Contest Details", "Help & FAQ", "About Chauhan Sons"].map((text) => (
                            <FooterLink key={text}>{text}</FooterLink>
                        ))}
                    </FooterSection>
                    {/* Contact Us */}
                    <FooterSection sx={{ minWidth: 220 }}>
                        <SectionTitle>Contact Us</SectionTitle>
                        <ContactInfo>+91 9876-535-881</ContactInfo>
                        <ChatSection>
                            <ChatTitle>Chat With Us</ChatTitle>
                            <ChatNumber>+91 9876-535-881</ChatNumber>
                            <SocialIcons>
                                <SocialIcon aria-label="WhatsApp">
                                    <WhatsApp fontSize="small" />
                                </SocialIcon>
                                <SocialIcon aria-label="Email">
                                    <Email fontSize="small" />
                                </SocialIcon>
                            </SocialIcons>
                        </ChatSection>
                    </FooterSection>
                </Container>
                {/* Bottom Section */}
                <BottomSection>
                    <SocialSection>
                        <SocialTitle>Social</SocialTitle>
                        <SocialIcons>
                            {[Facebook, Instagram, Twitter, YouTube].map((IconComp, idx) => (
                                <SocialIcon key={idx} aria-label={IconComp.displayName || "social-icon"}>
                                    <IconComp fontSize="small" />
                                </SocialIcon>
                            ))}
                        </SocialIcons>
                    </SocialSection>
                    <FooterLinksRow>
                        {["Terms & Conditions", "Privacy Policy", "Disclaimer"].map((text) => (
                            <BottomLink key={text}>{text}</BottomLink>
                        ))}
                    </FooterLinksRow>
                    <Copyright>© 2023 Chauhan Son's Company Limited. All Rights Reserved.</Copyright>
                </BottomSection>
            </FooterContainer>
        </div>
    );
}
