import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
} from "@mui/material";

const PolicySection = ({ items }) => (
  <Box>
    {items.map(({ heading, content, list }, idx) => (
      <Box key={idx} sx={{ mb: 4 }}>
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
  </Box>
);

const Privacy = () => (
  <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Effective Date: July 3, 2025 &nbsp;|&nbsp; Last Updated: July 3, 2025
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        At Chauhan sons jewellers&apos;s UK German Pharmaceuticals, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines the types of information we collect, how we use and protect it, and your rights regarding that information.
      </Typography>
      <PolicySection
        items={[
          {
            heading: "1. Information We Collect",
            content:
              "We collect both personal and non-personal information to improve our services and fulfill orders. The types of information we may collect include:",
            list: [
              "Personal Information: Name, email address, phone number, postal address, and payment details when you place an order or contact us.",
              "Non-Personal Information: IP address, browser type, device information, and browsing behavior through cookies and other tracking technologies.",
            ],
          },
          {
            heading: "2. How We Use Your Information",
            content: "We use your information to:",
            list: [
              "Process your orders and provide customer support.",
              "Improve our website and user experience.",
              "Send updates, promotional offers, and other communications with your consent.",
              "Comply with legal obligations and protect our rights.",
            ],
          },
          {
            heading: "3. Sharing Your Information",
            content:
              "We do not sell, rent, or share your personal information except in the following cases:",
            list: [
              "With your explicit consent.",
              "With service providers who assist in processing payments or shipping your orders.",
              "When required by law or legal processes, or to protect our rights or safety.",
            ],
          },
          {
            heading: "4. Cookies",
            content:
              "We use cookies to personalize your experience and track website usage for analytics purposes. You can modify your browser settings to disable cookies, but doing so may impact your experience on our site.",
          },
          {
            heading: "5. Data Security",
            content:
              "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or disclosure. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security.",
          },
          {
            heading: "6. Your Rights",
            content:
              "You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or withdraw consent where applicable. To exercise any of these rights, please contact us at chauhansons69@yahoo.com",
          },
          {
            heading: "7. Changes to Privacy Policy",
            content:
              "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated effective date will be clearly displayed. Your continued use of the Website constitutes acceptance of the updated policy.",
          },
        ]}
      />
    </Box>

    <Divider sx={{ mb: 6 }} />

    {/* Contact Section */}
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary">
        If you have any questions or concerns about our Privacy Policy, please contact us:
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography fontWeight={600}>Chauhan sons jewellers&apos;s UK German Pharmaceuticals</Typography>
        <Typography>Cheema, Punjab – 148031, India</Typography>
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
          <Link href="tel:+911234567890" color="inherit" underline="hover">
            +91 123 456 7890
          </Link>
        </Typography>
      </Box>
    </Box>
  </Container>
);

export default Privacy;
