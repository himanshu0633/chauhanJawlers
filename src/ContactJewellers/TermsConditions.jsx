import React from "react";
import {
    Container,
    Box,
    Typography,
    Stack,
    Link,
    Divider,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

// You can adjust theme colors and variant props as needed
const TermSection = ({ title, items }) => (
    <Stack spacing={3} sx={{ mt: 4 }}>
        {items.map(({ heading, content, list }, idx) => (
            <Box key={idx}>
                <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                    {heading}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    {content}
                </Typography>
                {list && (
                    <List>
                        {list.map((item, i) => (
                            <ListItem key={i} sx={{ pl: 0 }}>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" color="text.secondary">
                                            {item}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        ))}
    </Stack>
);

const TermsConditions = () => (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
        {/* Terms & Conditions */}
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
                Terms & Conditions
            </Typography>
            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                Effective Date: July 3, 2025 &nbsp;|&nbsp; Last Updated: July 3, 2025
            </Typography>
            <TermSection
                items={[
                    {
                        heading: "1. Use of the Website",
                        content:
                            "This Website is intended for informational and commercial purposes related to our animal healthcare and electropathy-based products. You may use the Website for lawful purposes only.",
                    },
                    {
                        heading: "2. Intellectual Property",
                        content:
                            "All content on this Website, including logos, images, text, product information, and software, is the property of UK German Pharmaceuticals and protected under applicable copyright, trademark, and intellectual property laws.",
                    },
                    {
                        heading: "3. Product Information & Medical Disclaimer",
                        content:
                            "Our products are feed supplements and are not intended to diagnose, treat, cure, or prevent any disease. Consult a licensed veterinary professional before administering any product. Information on the Website is for educational purposes only.",
                    },
                    {
                        heading: "4. Orders & Payments",
                        content:
                            "Orders placed through the Website are subject to product availability, pricing changes, and shipping policies. We reserve the right to cancel or reject any order at our discretion.",
                    },
                    {
                        heading: "5. Limitation of Liability",
                        content:
                            "We are not liable for any direct or indirect damages arising from the use of our Website or products. Your use of our Website and products is at your own risk.",
                    },
                    {
                        heading: "6. Third-Party Links",
                        content:
                            "Our Website may contain links to third-party websites. We are not responsible for the content or privacy practices of these sites.",
                    },
                    {
                        heading: "7. Changes to Terms",
                        content:
                            "We reserve the right to modify these Terms at any time. Continued use of the Website after any changes constitutes your acceptance of the new Terms.",
                    },
                ]}
            />
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Privacy Policy */}
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Effective Date: July 3, 2025 &nbsp;|&nbsp; Last Updated: July 3, 2025
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                At Chauhan sons jewellers, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our Website.
            </Typography>
            <TermSection
                items={[
                    {
                        heading: "1. Information We Collect",
                        content: "We may collect the following types of information:",
                        list: [
                            "Personal Information: Name, phone number, email address, and postal address when you place an order or contact us.",
                            "Non-Personal Data: Browser type, IP address, and usage statistics through cookies and analytics tools.",
                        ],
                    },
                    {
                        heading: "2. How We Use Your Information",
                        content: "We use your information to:",
                        list: [
                            "Fulfill orders and provide customer support",
                            "Improve our Website and services",
                            "Send updates, offers, and relevant communications (with your consent)",
                        ],
                    },
                    {
                        heading: "3. Sharing Your Information",
                        content:
                            "We do not sell, rent, or share your personal information with third parties, except:",
                        list: [
                            "With your consent",
                            "To comply with legal obligations",
                            "To service providers for payment processing or shipping",
                        ],
                    },
                    {
                        heading: "4. Cookies",
                        content:
                            "We use cookies to enhance your browsing experience and collect anonymized data about Website usage. You can disable cookies through your browser settings.",
                    },
                    {
                        heading: "5. Data Security",
                        content:
                            "We take reasonable technical and administrative measures to protect your data from unauthorized access, disclosure, or misuse.",
                    },
                    {
                        heading: "6. Your Rights",
                        content:
                            "You may request access, correction, or deletion of your personal data by contacting us at chauhansons69@yahoo.com.",
                    },
                    {
                        heading: "7. Changes to Privacy Policy",
                        content:
                            "We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with the updated effective date.",
                    },
                ]}
            />
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Contact Section */}
        <Box sx={{ mb: 2 }}>
            <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary">
                If you have any questions about our Terms &amp; Conditions or Privacy Policy, please contact:
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Typography fontWeight={600}> CHAUHAN SONS JEWELLER S.C.F 74, PHASE 5, SECTOR 59 , </Typography>
                <Typography>Sahibzada Ajit Singh Nagar, Punjab – 160059, India</Typography>

                <Typography>
                    Email:&nbsp;
                    <Link
                        href="mailto:chauhansons69@yahoo.com"
                        color="inherit"
                        underline="hover"
                    >
                        chauhansons69@yahoo.com
                    </Link>
                </Typography>
                <Typography>
                    Phone:&nbsp;
                    <Link href="tel:+919876535881" color="inherit" underline="hover">
                        +919876535881
                    </Link>
                </Typography>
            </Box>
        </Box>
    </Container>
);

export default TermsConditions;
