import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#44170D',        // dark brown bg
      contrastText: '#fff',   // white text on dark bg
      dark: '#38120b',
    },
    background: {
      default: '#fff',        // light bg
      paper: '#fff',
    },
    text: {
      primary: '#44170D',     // dark text on light bg
      secondary: '#44170D',
      light: '#fff',          // light text on dark bg
    },
    action: {
      hover: '#f5f5f5',
    },
  },
});

export default Theme;


