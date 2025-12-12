import { createTheme } from '@mui/material/styles';

/**
 * MUI 테마 설정
 * 컬러 팔레트 디자인 시스템 기반
 * - Primary: #E84A8A (로즈 핑크)
 * - Accent: #8B6FC0 (라일락)
 * - Background: #FFF8F8 (소프트 핑크)
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#E84A8A',
      light: '#F06A9E',
      dark: '#D63A7A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B6FC0',
      light: '#A88FD4',
      dark: '#6B4FA0',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF8F8',
      paper: '#FDF5F5',
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#5A5A5A',
      disabled: '#888888',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFC107',
    },
    error: {
      main: '#E84A8A',
    },
    info: {
      main: '#8B6FC0',
    },
    divider: '#F5C6D0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2D2D2D',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2D2D2D',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2D2D2D',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#5A5A5A',
    },
    body1: {
      fontSize: '1rem',
      color: '#5A5A5A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#888888',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#D63A7A',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(232, 74, 138, 0.1)',
        },
      },
    },
  },
});

export default theme;
