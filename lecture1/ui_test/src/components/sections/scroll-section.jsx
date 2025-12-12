import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

/**
 * ScrollSection 컴포넌트
 *
 * 스크롤 컨테이너와 스크롤 이벤트 처리 예시
 * 스크롤 위치를 실시간으로 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollSection />
 */
function ScrollSection() {
  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    percentage: 0
  });
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    setScrollInfo({
      scrollTop: Math.round(scrollTop),
      scrollHeight,
      clientHeight,
      percentage: Math.round(percentage) || 0
    });
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ 
      top: scrollRef.current.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  const scrollItems = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    text: '스크롤 아이템 ' + (index + 1)
  }));

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      {/* 섹션 타이틀 */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1
        }}
      >
        Scroll
      </Typography>

      <Grid container spacing={3}>
        {/* 스크롤 컨테이너 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            스크롤 컨테이너
          </Typography>
          <Paper
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              height: 300,
              overflow: 'auto',
              p: 2,
              bgcolor: 'grey.50'
            }}
          >
            {scrollItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,
                  mb: 1,
                  bgcolor: item.id % 2 === 0 ? 'grey.200' : 'white',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.300'
                }}
              >
                <Typography variant="body1">{item.text}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* 스크롤 컨트롤 버튼 */}
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={scrollToTop}>
              맨 위로
            </Button>
            <Button variant="outlined" size="small" onClick={scrollToBottom}>
              맨 아래로
            </Button>
          </Box>
        </Grid>

        {/* 스크롤 정보 표시 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            스크롤 정보
          </Typography>
          <Paper sx={{ p: 2 }}>
            {/* 스크롤 진행률 바 */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                스크롤 진행률
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={scrollInfo.percentage} 
                sx={{ height: 10, borderRadius: 1 }}
              />
              <Typography 
                variant="h4" 
                color="primary.main" 
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {scrollInfo.percentage}%
              </Typography>
            </Box>

            {/* 상세 정보 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'grey.100',
                  borderRadius: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  scrollTop (현재 위치)
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {scrollInfo.scrollTop}px
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'grey.100',
                  borderRadius: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  scrollHeight (전체 높이)
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {scrollInfo.scrollHeight}px
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'grey.100',
                  borderRadius: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  clientHeight (보이는 높이)
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {scrollInfo.clientHeight}px
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ScrollSection;
