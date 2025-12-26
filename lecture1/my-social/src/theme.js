import { createTheme } from '@mui/material/styles';

/**
 * SNS 애플리케이션 테마 설정
 * 디자인 컨셉: 소프트/파스텔 (따뜻하고 부드러운 느낌)
 * 메인 컬러: 오렌지/레드 계열 (코랄, 피치)
 * 테마 모드: 라이트 모드만 지원
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B6B',
      light: '#FFE5E5',
      dark: '#E55555',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFAB91',
      light: '#FFCCBC',
      dark: '#FF8A65',
    },
    error: {
      main: '#E57373',
    },
    warning: {
      main: '#FFB74D',
    },
    success: {
      main: '#81C784',
    },
    info: {
      main: '#64B5F6',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
      disabled: '#9E9E9E',
    },
    grey: {
      100: '#F8F8F8',
      300: '#E0E0E0',
      500: '#9E9E9E',
      700: '#616161',
      900: '#212121',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:active': {
            transform: 'scale(0.96)',
          },
        },
        outlined: {
          borderColor: '#E0E0E0',
          '&:hover': {
            borderColor: '#E0E0E0',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#F8F8F8',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B6B',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #FFE5E5',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 56,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E0E0E0',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#9E9E9E',
          '&.Mui-selected': {
            color: '#FF6B6B',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#212121',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:active': {
            transform: 'scale(0.96)',
          },
        },
      },
    },
  },
});

export default theme;
