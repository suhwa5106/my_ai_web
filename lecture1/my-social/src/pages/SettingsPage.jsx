import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

/**
 * SettingsPage 컴포넌트 (설정 페이지)
 *
 * 구성 요소:
 * - 계정 (프로필 편집, 비밀번호 변경, 계정 정보)
 * - 알림 (알림 설정)
 * - 개인정보 및 보안 (계정 공개 범위, 차단된 계정)
 * - 정보 (앱 정보, 이용약관)
 * - 로그아웃
 *
 * Example usage:
 * <SettingsPage />
 */
function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      section: '계정',
      items: [
        {
          label: '프로필 편집',
          icon: <PersonIcon />,
          path: '/profile/edit',
        },
        {
          label: '비밀번호 변경',
          icon: <LockIcon />,
          path: '/settings/password',
        },
        {
          label: '계정 정보',
          icon: <AccountCircleIcon />,
          path: '/settings/account',
        },
      ],
    },
    {
      section: '알림',
      items: [
        {
          label: '알림 설정',
          icon: <NotificationsIcon />,
          path: '/settings/notifications',
        },
      ],
    },
    {
      section: '개인정보 및 보안',
      items: [
        {
          label: '계정 공개 범위',
          icon: <VisibilityIcon />,
          path: '/settings/privacy',
        },
        {
          label: '차단된 계정',
          icon: <BlockIcon />,
          path: '/settings/blocked',
        },
      ],
    },
    {
      section: '정보',
      items: [
        {
          label: '앱 정보',
          icon: <InfoIcon />,
          path: '/settings/about',
        },
        {
          label: '이용약관',
          icon: <DescriptionIcon />,
          path: '/settings/terms',
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2">설정</Typography>
      </Box>

      {/* 메뉴 목록 */}
      <Box>
        {menuItems.map((section) => (
          <List
            key={section.section}
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: 'background.default',
                  fontWeight: 600,
                  lineHeight: '40px',
                }}
              >
                {section.section}
              </ListSubheader>
            }
          >
            {section.items.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </ListItem>
            ))}
            <Divider />
          </List>
        ))}

        {/* 로그아웃 버튼 */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              py: 1.5,
              borderColor: 'error.main',
              color: 'error.main',
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SettingsPage;
