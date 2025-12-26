import Box from '@mui/material/Box';
import Header from './Header';
import BottomNav from './BottomNav';

/**
 * Layout 컴포넌트 (메인 레이아웃)
 *
 * Props:
 * @param {React.ReactNode} children - 레이아웃 내부에 렌더링할 콘텐츠 [Required]
 * @param {boolean} hasHeader - 상단바 표시 여부 [Optional, 기본값: true]
 * @param {boolean} hasBottomNav - 하단 네비게이션 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <Layout>
 *   <HomePage />
 * </Layout>
 */
function Layout({ children, hasHeader = true, hasBottomNav = true }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {hasHeader && <Header />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: hasHeader ? '56px' : 0,
          pb: hasBottomNav ? '56px' : 0,
          px: { xs: 0, sm: 2 },
        }}
      >
        {children}
      </Box>

      {hasBottomNav && <BottomNav />}
    </Box>
  );
}

export default Layout;
