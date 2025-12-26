import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../hooks/useAuth';

/**
 * ChatPage 컴포넌트 (메시지 채팅창)
 *
 * 구성 요소:
 * - 헤더 (뒤로가기, 프로필, 더보기)
 * - 메시지 목록
 * - 메시지 입력창
 *
 * Example usage:
 * <ChatPage />
 */
function ChatPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatData();
  }, [userId, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatData = () => {
    const targetUserId = parseInt(userId, 10);
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find((u) => u.id === targetUserId);
    setOtherUser(foundUser);

    // 메시지 불러오기
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const chatMessages = storedMessages
      .filter(
        (msg) =>
          (msg.sender_id === currentUser?.id && msg.receiver_id === targetUserId) ||
          (msg.sender_id === targetUserId && msg.receiver_id === currentUser?.id)
      )
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    setMessages(chatMessages);

    // 읽음 처리
    const updatedMessages = storedMessages.map((msg) => {
      if (msg.sender_id === targetUserId && msg.receiver_id === currentUser?.id) {
        return { ...msg, is_read: true };
      }
      return msg;
    });
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMsg = {
      id: Date.now(),
      sender_id: currentUser?.id,
      receiver_id: parseInt(userId, 10),
      content: newMessage.trim(),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    storedMessages.push(newMsg);
    localStorage.setItem('messages', JSON.stringify(storedMessages));

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/messages')} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            src={otherUser?.profile_image}
            sx={{ width: 36, height: 36, mr: 1.5 }}
          >
            {otherUser?.nickname?.charAt(0)}
          </Avatar>
          <Typography variant="h3">{otherUser?.nickname}</Typography>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* 메시지 영역 */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'background.default',
        }}
      >
        {messages.map((msg) => {
          const isMine = msg.sender_id === currentUser?.id;

          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: isMine ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMine ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    bgcolor: isMine ? 'primary.main' : 'background.paper',
                    color: isMine ? 'white' : 'text.primary',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    borderTopRightRadius: isMine ? 0 : 16,
                    borderTopLeftRadius: isMine ? 16 : 0,
                    boxShadow: isMine ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', mt: 0.5, px: 0.5 }}
                >
                  {formatTime(msg.created_at)}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      {/* 입력창 */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="메시지 입력..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
            multiline
            maxRows={4}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
