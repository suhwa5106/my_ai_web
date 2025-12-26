import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../hooks/useAuth';

/**
 * MessagesPage 컴포넌트 (메시지 목록 페이지)
 *
 * 구성 요소:
 * - 헤더 (뒤로가기, 닉네임, 새 메시지)
 * - 대화 목록
 *
 * Example usage:
 * <MessagesPage />
 */
function MessagesPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    loadConversations();
  }, [currentUser]);

  const loadConversations = () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // 현재 사용자와 관련된 메시지 필터링
    const userMessages = storedMessages.filter(
      (msg) =>
        msg.sender_id === currentUser?.id || msg.receiver_id === currentUser?.id
    );

    // 대화 상대별로 그룹화
    const conversationMap = new Map();

    userMessages.forEach((msg) => {
      const otherUserId =
        msg.sender_id === currentUser?.id ? msg.receiver_id : msg.sender_id;

      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, {
          userId: otherUserId,
          messages: [],
          unreadCount: 0,
        });
      }

      const conv = conversationMap.get(otherUserId);
      conv.messages.push(msg);

      if (msg.receiver_id === currentUser?.id && !msg.is_read) {
        conv.unreadCount += 1;
      }
    });

    // 대화 목록 생성
    const conversationList = Array.from(conversationMap.values()).map((conv) => {
      const otherUser = storedUsers.find((u) => u.id === conv.userId);
      const lastMessage = conv.messages.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];

      return {
        ...conv,
        user: otherUser,
        lastMessage,
      };
    });

    // 최신 메시지순 정렬
    conversationList.sort(
      (a, b) =>
        new Date(b.lastMessage?.created_at) - new Date(a.lastMessage?.created_at)
    );

    setConversations(conversationList);
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const handleConversationClick = (userId) => {
    navigate(`/messages/${userId}`);
  };

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
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2">{currentUser?.nickname}</Typography>
        </Box>
        <IconButton aria-label="새 메시지">
          <EditIcon />
        </IconButton>
      </Box>

      {/* 대화 목록 */}
      {conversations.length > 0 ? (
        <List sx={{ p: 0 }}>
          {conversations.map((conv) => (
            <ListItem
              key={conv.userId}
              onClick={() => handleConversationClick(conv.userId)}
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.100' },
                py: 1.5,
                px: 2,
              }}
            >
              <ListItemAvatar>
                <Badge
                  badgeContent={conv.unreadCount}
                  color="primary"
                  invisible={conv.unreadCount === 0}
                >
                  <Avatar src={conv.user?.profile_image}>
                    {conv.user?.nickname?.charAt(0)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={conv.user?.nickname}
                secondary={
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px',
                      }}
                    >
                      {conv.lastMessage?.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{ color: 'text.disabled' }}
                    >
                      · {formatTimeAgo(conv.lastMessage?.created_at)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            p: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: 'text.secondary', mb: 1 }}>
            메시지 없음
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.disabled', textAlign: 'center' }}
          >
            친구에게 메시지를 보내보세요
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default MessagesPage;
