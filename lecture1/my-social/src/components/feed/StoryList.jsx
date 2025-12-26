import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

/**
 * StoryList 컴포넌트 (스토리 목록)
 *
 * Props:
 * @param {Array} stories - 스토리 목록 [Optional, 기본값: []]
 * @param {Object} currentUser - 현재 로그인한 사용자 [Optional]
 * @param {function} onStoryClick - 스토리 클릭 시 실행할 함수 [Optional]
 * @param {function} onAddStory - 스토리 추가 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <StoryList stories={storiesData} onStoryClick={handleStoryClick} />
 */
function StoryList({ stories = [], currentUser, onStoryClick, onAddStory }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        py: 2,
        px: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
      {/* 내 스토리 추가 버튼 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 64,
          cursor: 'pointer',
        }}
        onClick={onAddStory}
      >
        <Box
          sx={{
            position: 'relative',
            mb: 0.5,
          }}
        >
          <Avatar
            src={currentUser?.profile_image}
            sx={{
              width: 56,
              height: 56,
              border: '2px solid',
              borderColor: 'grey.300',
            }}
          >
            {currentUser?.nickname?.charAt(0)}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid',
              borderColor: 'background.paper',
            }}
          >
            <AddIcon sx={{ fontSize: 14, color: 'white' }} />
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.primary',
            maxWidth: 64,
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          내 스토리
        </Typography>
      </Box>

      {/* 다른 사용자 스토리 */}
      {stories.map((story) => (
        <Box
          key={story.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 64,
            cursor: 'pointer',
          }}
          onClick={() => onStoryClick?.(story)}
        >
          <Box
            sx={{
              p: 0.5,
              borderRadius: '50%',
              background: story.hasUnviewed
                ? 'linear-gradient(45deg, #FF6B6B, #FFAB91)'
                : 'transparent',
              mb: 0.5,
            }}
          >
            <Avatar
              src={story.user?.profile_image}
              sx={{
                width: 52,
                height: 52,
                border: '2px solid',
                borderColor: 'background.paper',
              }}
            >
              {story.user?.nickname?.charAt(0)}
            </Avatar>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.primary',
              maxWidth: 64,
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {story.user?.nickname}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default StoryList;
