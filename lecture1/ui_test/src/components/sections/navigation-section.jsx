import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * NavigationSection 컴포넌트
 *
 * MUI AppBar와 Toolbar를 사용한 네비게이션 예시
 * 모바일에서는 햄버거 메뉴로 전환
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationSection />
 */
function NavigationSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: '홈', key: 'home' },
    { label: '소개', key: 'about' },
    { label: '서비스', key: 'service' },
    { label: '연락처', key: 'contact' }
  ];

  const handleMenuClick = (label) => {
    alert(`${label} 메뉴가 클릭되었습니다!`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      {/* 섹션 타이틀 */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1
        }}
      >
        Navigation (AppBar)
      </Typography>

      {/* AppBar 데모 */}
      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            {/* 로고/타이틀 */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              MyApp
            </Typography>

            {/* 데스크톱 메뉴 */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.key}
                    color="inherit"
                    onClick={() => handleMenuClick(item.label)}
                    sx={{ textTransform: 'none' }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* 모바일 햄버거 메뉴 */}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
                aria-label="메뉴 열기"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* 모바일 Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.key} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(item.label)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* 설명 */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        * 화면 크기를 줄이면 햄버거 메뉴로 전환됩니다.
      </Typography>
    </Box>
  );
}

export default NavigationSection;
