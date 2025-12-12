import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

/**
 * SliderSection 컴포넌트
 *
 * MUI Slider를 사용한 슬라이더 예시
 * marks와 valueLabelDisplay 설정 포함
 *
 * Props: 없음
 *
 * Example usage:
 * <SliderSection />
 */
function SliderSection() {
  const [values, setValues] = useState({
    basic: 50,
    marked: 30,
    range: [20, 70]
  });

  const handleChange = (field) => (event, newValue) => {
    setValues((prev) => ({
      ...prev,
      [field]: newValue
    }));
  };

  const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
  ];

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
        Slider
      </Typography>

      <Grid container spacing={4}>
        {/* 기본 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            기본 슬라이더
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.basic}
              onChange={handleChange('basic')}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: 'grey.100',
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              현재값:
            </Typography>
            <Typography variant="h6" color="primary.main">
              {values.basic}
            </Typography>
          </Box>
        </Grid>

        {/* 마크 표시 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            마크 표시
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.marked}
              onChange={handleChange('marked')}
              valueLabelDisplay="on"
              marks={marks}
              min={0}
              max={100}
              step={5}
            />
          </Box>
          <Box
            sx={{
              mt: 4,
              p: 1.5,
              bgcolor: 'grey.100',
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              현재값:
            </Typography>
            <Typography variant="h6" color="primary.main">
              {values.marked}
            </Typography>
          </Box>
        </Grid>

        {/* 범위 슬라이더 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            범위 슬라이더
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={values.range}
              onChange={handleChange('range')}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: 'grey.100',
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              범위:
            </Typography>
            <Typography variant="h6" color="primary.main">
              {values.range[0]} - {values.range[1]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SliderSection;
