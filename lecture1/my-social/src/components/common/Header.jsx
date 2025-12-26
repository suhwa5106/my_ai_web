import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

/**
 * Header 컴포넌트 (상단바)
 *
 * Props:
 * @param {number} notificationCount - 읽지 않은 알림 개수 [Optional, 기본값: 0]
 * @param {number} messageCount - 읽지 않은 메시지 개수 [Optional, 기본값: 0]
 *
 * Example usage:
 * <Header notificationCount={3} messageCount={1} />
 */
function Header({ notificationCount = 0, messageCount = 0 }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleMessageClick = () => {
    navigate('/messages');
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h2"
          component="div"
          onClick={handleLogoClick}
          sx={{
            cursor: 'pointer',
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          MySocial
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            aria-label="알림"
          >
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsIcon sx={{ color: 'text.primary' }} />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleMessageClick}
            aria-label="메시지"
          >
            <Badge badgeContent={messageCount} color="primary">
              <MailIcon sx={{ color: 'text.primary' }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
