import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from '../components/common/Navbar';
import { supabase } from '../lib/supabase';

/**
 * MainPage 컴포넌트
 * 게시물 목록 메인 페이지
 *
 * Example usage:
 * <MainPage />
 */
function MainPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        comments:comments(count),
        likes:likes(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 3,
          }}
        >
          게시물 목록
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : posts.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                아직 게시물이 없습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                첫 번째 게시물을 작성해보세요!
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(139, 115, 85, 0.15)',
                  },
                }}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: { xs: 1, md: 2 },
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {post.author_nickname}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <Typography variant="body2">
                        {formatDate(post.created_at)}
                      </Typography>
                    </Box>

                    <Chip
                      icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                      label={post.likes?.[0]?.count || 0}
                      size="small"
                      sx={{
                        bgcolor: 'secondary.light',
                        color: 'text.primary',
                        '& .MuiChip-icon': {
                          color: 'error.main',
                        },
                      }}
                    />

                    <Chip
                      icon={<ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />}
                      label={post.comments?.[0]?.count || 0}
                      size="small"
                      sx={{
                        bgcolor: 'secondary.light',
                        color: 'text.primary',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default MainPage;
