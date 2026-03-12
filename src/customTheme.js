import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Small (Mobile): 320px – 480px
// Medium (Tablet): 481px – 768px
// Large (Laptop/Small Desktop): 769px – 1024px
// Extra Large (Desktop): 1025px – 1200px
// XXL (Large Desktop): 1200px or 1400px+ 