import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

/**
 * RadioSection 컴포넌트
 *
 * MUI RadioGroup과 FormControlLabel을 사용한 라디오 버튼 예시
 * 선택값을 실시간으로 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <RadioSection />
 */
function RadioSection() {
  const [values, setValues] = useState({
    gender: '',
    plan: '',
    size: ''
  });

  const handleChange = (field) => (event) => {
    setValues((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const radioGroups = [
    {
      key: 'gender',
      label: '성별',
      options: [
        { value: 'male', label: '남성' },
        { value: 'female', label: '여성' },
        { value: 'other', label: '기타' }
      ]
    },
    {
      key: 'plan',
      label: '요금제',
      options: [
        { value: 'free', label: '무료' },
        { value: 'basic', label: '베이직' },
        { value: 'pro', label: '프로' },
        { value: 'enterprise', label: '엔터프라이즈' }
      ]
    },
    {
      key: 'size',
      label: '사이즈',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
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
        Radio
      </Typography>

      <Grid container spacing={3}>
        {radioGroups.map((group) => (
          <Grid size={{ xs: 12, md: 4 }} key={group.key}>
            <FormControl>
              <FormLabel id={`${group.key}-label`}>{group.label}</FormLabel>
              <RadioGroup
                aria-labelledby={`${group.key}-label`}
                name={group.key}
                value={values[group.key]}
                onChange={handleChange(group.key)}
              >
                {group.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
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
                {values[group.key]
                  ? group.options.find((o) => o.value === values[group.key])?.label
                  : '-'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RadioSection;
