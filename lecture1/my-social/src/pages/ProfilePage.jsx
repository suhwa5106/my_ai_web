import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsIcon from '@mui/icons-material/Settings';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Layout from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';

/**
 * ProfilePage 컴포넌트 (프로필 페이지)
 *
 * 구성 요소:
 * - 닉네임
 * - 프로필 이미지
 * - 게시물/팔로워/팔로잉 수
 * - 바이오
 * - 프로필 편집/팔로우 버튼
 * - 게시물 그리드
 *
 * Example usage:
 * <ProfilePage />
 */
function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [stats, setStats] = useState({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  const isOwnProfile = !userId || userId === String(currentUser?.id);

  useEffect(() => {
    loadProfileData();
  }, [userId, currentUser]);

  const loadProfileData = async () => {
    setIsLoading(true);

    const targetUserId = userId ? parseInt(userId, 10) : currentUser?.id;
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find((u) => u.id === targetUserId);

    if (!foundUser && !isOwnProfile) {
      navigate('/');
      return;
    }

    const displayUser = isOwnProfile ? currentUser : foundUser;
    setProfileUser(displayUser);

    // 게시물 불러오기
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const userPosts = storedPosts
      .filter((post) => post.user_id === displayUser?.id)
      .map((post) => {
        const images = JSON.parse(localStorage.getItem(`post_images_${post.id}`) || '[]');
        return { ...post, images };
      });
    setPosts(userPosts);

    // 북마크 불러오기 (본인 프로필일 때만)
    if (isOwnProfile) {
      const storedBookmarks = JSON.parse(
        localStorage.getItem(`bookmarks_${currentUser?.id}`) || '[]'
      );
      const bookmarkedPosts = storedBookmarks.map((bookmark) => {
        const post = storedPosts.find((p) => p.id === bookmark.post_id);
        if (post) {
          const images = JSON.parse(localStorage.getItem(`post_images_${post.id}`) || '[]');
          return { ...post, images };
        }
        return null;
      }).filter(Boolean);
      setBookmarks(bookmarkedPosts);
    }

    // 팔로우 상태 확인
    const follows = JSON.parse(localStorage.getItem('follows') || '[]');
    const isUserFollowing = follows.some(
      (f) => f.follower_id === currentUser?.id && f.following_id === displayUser?.id
    );
    setIsFollowing(isUserFollowing);

    // 통계
    const followers = follows.filter((f) => f.following_id === displayUser?.id);
    const following = follows.filter((f) => f.follower_id === displayUser?.id);

    setStats({
      postsCount: userPosts.length,
      followersCount: followers.length,
      followingCount: following.length,
    });

    setIsLoading(false);
  };

  const handleFollow = () => {
    const follows = JSON.parse(localStorage.getItem('follows') || '[]');

    if (isFollowing) {
      const updated = follows.filter(
        (f) => !(f.follower_id === currentUser?.id && f.following_id === profileUser?.id)
      );
      localStorage.setItem('follows', JSON.stringify(updated));
      setStats((prev) => ({ ...prev, followersCount: prev.followersCount - 1 }));
    } else {
      follows.push({
        id: Date.now(),
        follower_id: currentUser?.id,
        following_id: profileUser?.id,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('follows', JSON.stringify(follows));
      setStats((prev) => ({ ...prev, followersCount: prev.followersCount + 1 }));
    }

    setIsFollowing(!isFollowing);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
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
      <Box sx={{ bgcolor: 'background.paper' }}>
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
          <Typography variant="h2">{profileUser?.nickname}</Typography>
          {isOwnProfile && (
            <IconButton onClick={() => navigate('/settings')}>
              <SettingsIcon />
            </IconButton>
          )}
        </Box>

        {/* 프로필 정보 */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {/* 프로필 이미지 */}
            <Avatar
              src={profileUser?.profile_image}
              sx={{
                width: 80,
                height: 80,
                mr: 3,
              }}
            >
              {profileUser?.nickname?.charAt(0)}
            </Avatar>

            {/* 통계 */}
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-around' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3">{stats.postsCount}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  게시물
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h3">{stats.followersCount}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  팔로워
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h3">{stats.followingCount}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  팔로잉
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 바이오 */}
          {profileUser?.bio && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {profileUser.bio}
            </Typography>
          )}

          {/* 버튼 */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isOwnProfile ? (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/profile/edit')}
                >
                  프로필 편집
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/profile/${currentUser?.id}`
                    );
                  }}
                >
                  프로필 공유
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={isFollowing ? 'outlined' : 'contained'}
                  fullWidth
                  onClick={handleFollow}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/messages/${profileUser?.id}`)}
                >
                  메시지
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* 탭 */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Tab icon={<GridOnIcon />} aria-label="게시물" />
          {isOwnProfile && <Tab icon={<BookmarkBorderIcon />} aria-label="저장됨" />}
        </Tabs>

        {/* 게시물 그리드 */}
        <Box sx={{ p: 0.5 }}>
          <Grid container spacing={0.5}>
            {(activeTab === 0 ? posts : bookmarks).map((post) => (
              <Grid key={post.id} size={{ xs: 4 }}>
                <Box
                  onClick={() => handlePostClick(post.id)}
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    bgcolor: 'grey.200',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                  }}
                >
                  {post.images?.[0]?.image_url && (
                    <Box
                      component="img"
                      src={post.images[0].image_url}
                      alt="게시물"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          {(activeTab === 0 ? posts : bookmarks).length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
              }}
            >
              <Typography variant="h3" sx={{ color: 'text.secondary', mb: 1 }}>
                {activeTab === 0 ? '게시물 없음' : '저장된 게시물 없음'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                {activeTab === 0
                  ? '첫 번째 게시물을 공유해보세요'
                  : '게시물을 저장하면 여기에 표시됩니다'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default ProfilePage;
