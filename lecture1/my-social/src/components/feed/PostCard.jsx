import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

/**
 * PostCard 컴포넌트 (게시물 카드)
 *
 * Props:
 * @param {Object} post - 게시물 데이터 [Required]
 * @param {function} onLike - 좋아요 클릭 시 실행할 함수 [Optional]
 * @param {function} onComment - 댓글 클릭 시 실행할 함수 [Optional]
 * @param {function} onShare - 공유 클릭 시 실행할 함수 [Optional]
 * @param {function} onBookmark - 저장 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <PostCard post={postData} onLike={handleLike} />
 */
function PostCard({ post, onLike, onComment, onShare, onBookmark }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    onLike?.(post.id, newIsLiked);
  };

  const handleBookmark = () => {
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);
    onBookmark?.(post.id, newIsBookmarked);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.user?.id}`);
  };

  const handleImageSwipe = (direction) => {
    if (direction === 'left' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else if (direction === 'right' && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 0, boxShadow: 'none' }}>
      {/* 헤더: 프로필 영역 */}
      <CardHeader
        avatar={
          <Avatar
            src={post.user?.profile_image}
            onClick={handleProfileClick}
            sx={{ cursor: 'pointer' }}
          >
            {post.user?.nickname?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="더보기">
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, cursor: 'pointer' }}
              onClick={handleProfileClick}
            >
              {post.user?.nickname}
            </Typography>
            {post.location && (
              <>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  ·
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {post.location}
                </Typography>
              </>
            )}
          </Box>
        }
        sx={{ py: 1 }}
      />

      {/* 이미지 영역 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          bgcolor: 'grey.100',
          overflow: 'hidden',
        }}
      >
        {images.length > 0 ? (
          <Box
            component="img"
            src={images[currentImageIndex]?.image_url}
            alt={`게시물 이미지 ${currentImageIndex + 1}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            이미지 없음
          </Box>
        )}

        {/* 이미지 인디케이터 */}
        {hasMultipleImages && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 0.5,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: index === currentImageIndex ? 'primary.main' : 'rgba(255,255,255,0.5)',
                  transition: 'background-color 0.2s',
                }}
              />
            ))}
          </Box>
        )}

        {/* 이미지 네비게이션 */}
        {hasMultipleImages && (
          <>
            {currentImageIndex > 0 && (
              <Box
                onClick={() => handleImageSwipe('right')}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                ‹
              </Box>
            )}
            {currentImageIndex < images.length - 1 && (
              <Box
                onClick={() => handleImageSwipe('left')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                ›
              </Box>
            )}
          </>
        )}
      </Box>

      {/* 리액션 영역 */}
      <CardActions sx={{ px: 1, py: 0.5 }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <IconButton onClick={handleLike} aria-label="좋아요">
            {isLiked ? (
              <FavoriteIcon sx={{ color: 'primary.main' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={() => onComment?.(post.id)} aria-label="댓글">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton onClick={() => onShare?.(post.id)} aria-label="공유">
            <SendIcon sx={{ transform: 'rotate(-30deg)' }} />
          </IconButton>
        </Box>
        <IconButton onClick={handleBookmark} aria-label="저장">
          {isBookmarked ? (
            <BookmarkIcon sx={{ color: 'text.primary' }} />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>
      </CardActions>

      {/* 콘텐츠 영역 */}
      <CardContent sx={{ py: 0, px: 2 }}>
        {/* 좋아요 수 */}
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          좋아요 {likeCount.toLocaleString()}개
        </Typography>

        {/* 캡션 */}
        {post.caption && (
          <Box sx={{ mb: 0.5 }}>
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: 600, mr: 0.5 }}
            >
              {post.user?.nickname}
            </Typography>
            <Typography variant="body2" component="span">
              {isExpanded || post.caption.length <= 100
                ? post.caption
                : `${post.caption.slice(0, 100)}...`}
            </Typography>
            {post.caption.length > 100 && !isExpanded && (
              <Typography
                variant="body2"
                component="span"
                onClick={() => setIsExpanded(true)}
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  ml: 0.5,
                }}
              >
                더 보기
              </Typography>
            )}
          </Box>
        )}

        {/* 댓글 수 */}
        {post.commentCount > 0 && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              cursor: 'pointer',
              mb: 0.5,
            }}
            onClick={() => onComment?.(post.id)}
          >
            댓글 {post.commentCount}개 모두 보기
          </Typography>
        )}

        {/* 업로드 시간 */}
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatTimeAgo(post.created_at)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
