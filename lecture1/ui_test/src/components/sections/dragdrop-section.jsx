import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

/**
 * DragDropSection 컴포넌트
 *
 * HTML5 Drag & Drop API를 사용한 드래그 앤 드롭 예시
 * 드래그 가능한 아이템과 드롭 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <DragDropSection />
 */
function DragDropSection() {
  const [items, setItems] = useState([
    { id: 1, text: '아이템 1', color: 'primary.main' },
    { id: 2, text: '아이템 2', color: 'secondary.main' },
    { id: 3, text: '아이템 3', color: 'success.main' }
  ]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [dragOverDrop, setDragOverDrop] = useState(false);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    setDraggingId(item.id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOverDrop(true);
  };

  const handleDragLeave = () => {
    setDragOverDrop(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOverDrop(false);
    
    const data = e.dataTransfer.getData('text/plain');
    const item = JSON.parse(data);
    
    if (!droppedItems.find((i) => i.id === item.id)) {
      setDroppedItems((prev) => [...prev, item]);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const handleReset = () => {
    setItems([
      { id: 1, text: '아이템 1', color: 'primary.main' },
      { id: 2, text: '아이템 2', color: 'secondary.main' },
      { id: 3, text: '아이템 3', color: 'success.main' }
    ]);
    setDroppedItems([]);
  };

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
        Drag & Drop
      </Typography>

      <Grid container spacing={3}>
        {/* 드래그 가능한 아이템들 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            드래그 아이템
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {items.length > 0 ? (
              items.map((item) => (
                <Paper
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  sx={{
                    p: 2,
                    bgcolor: item.color,
                    color: 'white',
                    cursor: 'grab',
                    opacity: draggingId === item.id ? 0.5 : 1,
                    transition: 'opacity 0.2s, transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    },
                    '&:active': {
                      cursor: 'grabbing'
                    }
                  }}
                >
                  {item.text}
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                모든 아이템이 드롭되었습니다.
              </Typography>
            )}
          </Box>
        </Grid>

        {/* 드롭 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            드롭 영역
          </Typography>
          <Paper
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              p: 2,
              minHeight: 150,
              border: '2px dashed',
              borderColor: dragOverDrop ? 'primary.main' : 'grey.400',
              bgcolor: dragOverDrop ? 'primary.light' : 'grey.100',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {droppedItems.length > 0 ? (
              droppedItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.5,
                    bgcolor: item.color,
                    color: 'white',
                    borderRadius: 1
                  }}
                >
                  {item.text}
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                여기에 아이템을 드롭하세요
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* 리셋 버튼 */}
      <Box sx={{ mt: 2 }}>
        <Typography
          component="span"
          onClick={handleReset}
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            '&:hover': { color: 'primary.dark' }
          }}
        >
          초기화
        </Typography>
      </Box>
    </Box>
  );
}

export default DragDropSection;
