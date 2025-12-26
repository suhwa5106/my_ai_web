import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Layout from '../components/common/Layout';
import { supabase } from '../lib/supabase';

/**
 * SearchPage 컴포넌트 (검색 페이지)
 *
 * 구성 요소:
 * - 검색어 입력창
 * - 최근 검색어 목록
 * - 추천 사용자/게시물
 *
 * Example usage:
 * <SearchPage />
 */
function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadRecentSearches();
    loadExplorePosts();
    loadAllUsers();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const loadRecentSearches = () => {
    const stored = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(stored);
  };

  const loadAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, nickname, profile_image, bio')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setAllUsers(data);
      }
    } catch (err) {
      console.error('Load users error:', err);
    }
  };

  const loadExplorePosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, content, image_url, created_at')
        .order('created_at', { ascending: false })
        .limit(9);

      if (!error && posts) {
        setExplorePosts(posts);
      }
    } catch (err) {
      console.error('Load posts error:', err);
    }
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    try {
      const queryLower = query.toLowerCase().trim();

      const { data, error } = await supabase
        .from('users')
        .select('id, username, nickname, profile_image, bio')
        .or(`nickname.ilike.%${queryLower}%,username.ilike.%${queryLower}%`)
        .limit(20);

      if (!error && data) {
        setSearchResults(data);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
    setIsSearching(false);
  };

  const addToRecentSearches = (user) => {
    const updated = [
      user,
      ...recentSearches.filter((item) => item.id !== user.id),
    ].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const removeFromRecentSearches = (userId) => {
    const updated = recentSearches.filter((item) => item.id !== userId);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleUserClick = (user) => {
    addToRecentSearches(user);
    navigate(`/profile/${user.id}`);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        {/* 검색 입력창 */}
        <TextField
          fullWidth
          placeholder="닉네임 또는 아이디로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                {isSearching ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ) : null,
          }}
          sx={{ mb: 2 }}
        />

        {/* 검색 결과 */}
        {searchQuery.trim() ? (
          <Box>
            {isSearching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : searchResults.length > 0 ? (
              <List>
                {searchResults.map((user) => (
                  <ListItem
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.profile_image}>
                        {user.nickname?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.nickname}
                      secondary={`@${user.username}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}
              >
                검색 결과가 없습니다
              </Typography>
            )}
          </Box>
        ) : (
          <>
            {/* 최근 검색 */}
            {recentSearches.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    최근 검색
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('recentSearches');
                    }}
                  >
                    모두 지우기
                  </Typography>
                </Box>
                <List>
                  {recentSearches.map((user) => (
                    <ListItem
                      key={user.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromRecentSearches(user.id);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      }
                      onClick={() => handleUserClick(user)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={user.profile_image}>
                          {user.nickname?.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.nickname}
                        secondary={`@${user.username}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* 추천 사용자 */}
            {allUsers.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  추천 사용자
                </Typography>
                <List>
                  {allUsers.slice(0, 5).map((user) => (
                    <ListItem
                      key={user.id}
                      onClick={() => handleUserClick(user)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={user.profile_image}>
                          {user.nickname?.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.nickname}
                        secondary={`@${user.username}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* 추천 게시물 그리드 */}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                추천 게시물
              </Typography>
              <Grid container spacing={0.5}>
                {explorePosts.map((post) => (
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
                      {post.image_url && (
                        <Box
                          component="img"
                          src={post.image_url}
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
              {explorePosts.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}
                >
                  추천 게시물이 없습니다
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default SearchPage;
