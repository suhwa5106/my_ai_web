import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 * DropdownSection 컴포넌트
 *
 * MUI Select와 MenuItem을 사용한 드롭다운 예시
 * 선택값을 실시간으로 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <DropdownSection />
 */
function DropdownSection() {
  const [values, setValues] = useState({
    country: '',
    language: '',
    category: ''
  });

  const handleChange = (field) => (event) => {
    setValues((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const dropdowns = [
    {
      key: 'country',
      label: '국가 선택',
      options: [
        { value: 'korea', label: '대한민국' },
        { value: 'usa', label: '미국' },
        { value: 'japan', label: '일본' },
        { value: 'china', label: '중국' },
        { value: 'uk', label: '영국' }
      ]
    },
    {
      key: 'language',
      label: '언어 선택',
      options: [
        { value: 'ko', label: '한국어' },
        { value: 'en', label: 'English' },
        { value: 'ja', label: '日本語' },
        { value: 'zh', label: '中文' }
      ]
    },
    {
      key: 'category',
      label: '카테고리',
      options: [
        { value: 'tech', label: '기술' },
        { value: 'design', label: '디자인' },
        { value: 'marketing', label: '마케팅' }
      ]
    }
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
        Dropdown (Select)
      </Typography>

      {/* Select 컴포넌트들 */}
      <Grid container spacing={3}>
        {dropdowns.map((dropdown) => (
          <Grid size={{ xs: 12, md: 4 }} key={dropdown.key}>
            <FormControl fullWidth>
              <InputLabel id={`${dropdown.key}-label`}>
                {dropdown.label}
              </InputLabel>
              <Select
                labelId={`${dropdown.key}-label`}
                id={dropdown.key}
                value={values[dropdown.key]}
                label={dropdown.label}
                onChange={handleChange(dropdown.key)}
              >
                {dropdown.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                mt: 1.5,
                p: 1.5,
                bgcolor: 'grey.100',
                borderRadius: 1,
                minHeight: 40
              }}
            >
              <Typography variant="caption" color="text.secondary">
                선택값:
              </Typography>
              <Typography variant="body2">
                {values[dropdown.key]
                  ? dropdown.options.find((o) => o.value === values[dropdown.key])?.label
                  : '-'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DropdownSection;
