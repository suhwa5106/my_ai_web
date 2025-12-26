import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';

/**
 * BottomNav 컴포넌트 (하단 네비게이션)
 *
 * 구성 요소:
 * - 홈 아이콘 (메인 피드)
 * - 검색 아이콘 (검색 페이지)
 * - 업로드 아이콘 (게시물 작성)
 * - 프로필 아이콘 (내 프로필)
 *
 * Example usage:
 * <BottomNav />
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  const navItems = [
    { label: '홈', icon: <HomeIcon />, path: '/' },
    { label: '검색', icon: <SearchIcon />, path: '/search' },
    { label: '업로드', icon: <AddBoxIcon />, path: '/upload' },
    { label: '프로필', icon: <PersonIcon />, path: '/profile' },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (currentIndex !== -1) {
      setValue(currentIndex);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(navItems[newValue].path);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels={false}
        value={value}
        onChange={handleChange}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            icon={item.icon}
            aria-label={item.label}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
