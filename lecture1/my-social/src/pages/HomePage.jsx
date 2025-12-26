import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Layout from '../components/common/Layout';
import StoryList from '../components/feed/StoryList';
import PostCard from '../components/feed/PostCard';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

/**
 * HomePage 컴포넌트 (메인 피드 페이지)
 *
 * 구성 요소:
 * - 스토리 영역
 * - 타임라인 (게시물 목록)
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    setIsLoading(true);

    try {
      // Supabase에서 모든 게시물 불러오기
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Posts load error:', postsError);
      }

      // 사용자 정보 불러오기
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, username, nickname, profile_image');

      if (usersError) {
        console.error('Users load error:', usersError);
      }

      // 게시물에 사용자 정보 추가
      const postsWithUserInfo = (postsData || []).map((post) => {
        const postUser = (usersData || []).find((u) => u.id === post.user_id);
        return {
          ...post,
          user: postUser || { nickname: post.author_nickname || '알 수 없음' },
          images: post.image_url ? [{ image_url: post.image_url }] : [],
          likeCount: 0,
          commentCount: 0,
          isLiked: false,
        };
      });

      setPosts(postsWithUserInfo);

      // 스토리 데이터 (사용자 목록에서 생성)
      const demoStories = (usersData || [])
        .filter((u) => u.id !== user?.id)
        .slice(0, 10)
        .map((u) => ({
          id: u.id,
          user: u,
          hasUnviewed: Math.random() > 0.5,
        }));

      setStories(demoStories);
    } catch (err) {
      console.error('Load feed error:', err);
    }

    setIsLoading(false);
  };

  const handleLike = (postId, isLiked) => {
    const likes = JSON.parse(localStorage.getItem(`likes_${postId}`) || '[]');

    if (isLiked) {
      likes.push({ user_id: user?.id, created_at: new Date().toISOString() });
    } else {
      const index = likes.findIndex((like) => like.user_id === user?.id);
      if (index > -1) {
        likes.splice(index, 1);
      }
    }

    localStorage.setItem(`likes_${postId}`, JSON.stringify(likes));
  };

  const handleBookmark = (postId, isBookmarked) => {
    const bookmarks = JSON.parse(localStorage.getItem(`bookmarks_${user?.id}`) || '[]');

    if (isBookmarked) {
      bookmarks.push({ post_id: postId, created_at: new Date().toISOString() });
    } else {
      const index = bookmarks.findIndex((b) => b.post_id === postId);
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
    }

    localStorage.setItem(`bookmarks_${user?.id}`, JSON.stringify(bookmarks));
  };

  const handleStoryClick = (story) => {
    console.log('Story clicked:', story);
  };

  const handleAddStory = () => {
    console.log('Add story clicked');
  };

  if (isLoading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 스토리 영역 */}
      <StoryList
        stories={stories}
        currentUser={user}
        onStoryClick={handleStoryClick}
        onAddStory={handleAddStory}
      />

      {/* 타임라인 영역 */}
      <Box sx={{ bgcolor: 'background.default' }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '40vh',
              p: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: 'text.secondary', mb: 1 }}
            >
              아직 게시물이 없습니다
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.disabled', textAlign: 'center' }}
            >
              팔로우한 사람들의 게시물이 여기에 표시됩니다.
              <br />
              첫 번째 게시물을 업로드해보세요!
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default HomePage;
