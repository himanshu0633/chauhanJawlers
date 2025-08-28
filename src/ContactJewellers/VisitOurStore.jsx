import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Divider,
    Grid,
    Link as MuiLink,
    Stack,
    Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MapIcon from '@mui/icons-material/Map';
import DiamondIcon from '@mui/icons-material/Diamond';

export default function VisitOurStore({
    storeName = 'Chauhan Sons Jewellers',
    tagline = 'Timeless pieces, crafted with love.',
    addressLine1 = '12 Regal Arcade',
    addressLine2 = 'MG Road, Bengaluru 560001',
    phone = '+91 98765 43210',
    hours = [
        { day: 'Mon – Fri', time: '10:00 AM – 8:00 PM' },
        { day: 'Saturday', time: '10:00 AM – 9:00 PM' },
        { day: 'Sunday', time: '11:00 AM – 7:00 PM' },
    ],
    heroImg = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1600&auto=format&fit=crop',
    mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!...', // replace with your actual embed
    mapLink = 'https://maps.app.goo.gl/', // replace with your actual link
    whatsappLink = 'https://wa.me/919876543210', // optional
}) {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 10 },
                background:
                    'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,250,240,0.65) 100%)',
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Stack spacing={1.5} alignItems="center" textAlign="center" mb={5}>
                    <Chip
                        icon={<DiamondIcon />}
                        label="Visit Our Boutique"
                        sx={{
                            borderRadius: '999px',
                            fontWeight: 600,
                            bgcolor: 'rgba(212,175,55,0.08)',
                            color: 'text.primary',
                        }}
                    />
                    <Typography
                        component="h2"
                        variant="h3"
                        sx={{ fontWeight: 700, letterSpacing: 0.3 }}
                    >
                        {storeName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ maxWidth: 680 }}
                    >
                        {tagline}
                    </Typography>
                </Stack>

                <Grid container spacing={4} alignItems="stretch">
                    {/* Left: Visual / Story */}
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image={heroImg}
                                    alt="Interior of our jewelry boutique"
                                    sx={{ height: { xs: 240, sm: 320 }, objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background:
                                            'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.0) 60%)',
                                    }}
                                    aria-hidden
                                />
                                <Typography
                                    variant="overline"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 12,
                                        left: 16,
                                        px: 1,
                                        bgcolor: 'rgba(255,255,255,0.85)',
                                        borderRadius: 1,
                                        fontWeight: 700,
                                        letterSpacing: 1,
                                    }}
                                >
                                    Fine Jewellery • Custom Designs • Certified Diamonds
                                </Typography>
                            </Box>

                            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                <Typography variant="h6" gutterBottom>
                                    Experience the sparkle in person
                                </Typography>
                                <Typography color="text.secondary" mb={2}>
                                    Try on pieces, feel the craftsmanship, and let our stylists
                                    guide you to a forever favourite—engagement rings, wedding
                                    bands, heritage gold, or contemporary gemstones.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<MapIcon />}
                                        href={mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            bgcolor: '#D4AF37', // "gold"
                                            '&:hover': { bgcolor: '#b9942f' },
                                        }}
                                    >
                                        Get Directions
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PhoneIcon />}
                                        href={`tel:${phone.replace(/\s+/g, '')}`}
                                        sx={{ textTransform: 'none', fontWeight: 700 }}
                                    >
                                        Call Us
                                    </Button>
                                    {whatsappLink && (
                                        <Button
                                            variant="text"
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ textTransform: 'none', fontWeight: 700 }}
                                        >
                                            Chat on WhatsApp
                                        </Button>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right: Details / Map */}
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <LocationOnIcon />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Address
                                            </Typography>
                                            <Typography fontWeight={600}>
                                                {addressLine1}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {addressLine2}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider />

                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                        <ScheduleIcon sx={{ mt: 0.5 }} />
                                        <Box sx={{ width: '100%' }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                Store Hours
                                            </Typography>
                                            <Grid container spacing={1}>
                                                {hours.map((h) => (
                                                    <Grid
                                                        key={h.day}
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        display="flex"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography>{h.day}</Typography>
                                                        <Typography color="text.secondary">{h.time}</Typography>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </Stack>

                                    <Divider />

                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <PhoneIcon />
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Phone
                                            </Typography>
                                            <MuiLink
                                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                                underline="hover"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {phone}
                                            </MuiLink>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </CardContent>

                            {/* Map */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    minHeight: 260,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box
                                    component="iframe"
                                    title="Store location map"
                                    src={mapEmbedUrl}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    style={{ border: 0, width: '100%', height: '100%' }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bottom bar: micro-copy */}
                <Stack
                    spacing={1}
                    alignItems="center"
                    textAlign="center"
                    mt={5}
                >
                    <Typography variant="body2" color="text.secondary">
                        Complimentary cleaning & resizing on first purchase • BIS-hallmarked gold • GIA/IGI-certified diamonds
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
