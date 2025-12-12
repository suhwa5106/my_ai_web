import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * InputSection 컴포넌트
 *
 * MUI TextField의 다양한 variant를 보여주는 섹션
 * 입력값을 실시간으로 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <InputSection />
 */
function InputSection() {
  const [values, setValues] = useState({
    standard: '',
    outlined: '',
    filled: ''
  });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({
      ...prev,
      [variant]: event.target.value
    }));
  };

  const variants = [
    { key: 'standard', label: 'Standard', placeholder: '텍스트를 입력하세요' },
    { key: 'outlined', label: 'Outlined', placeholder: '텍스트를 입력하세요' },
    { key: 'filled', label: 'Filled', placeholder: '텍스트를 입력하세요' }
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
        Input (TextField)
      </Typography>

      {/* Variant별 입력 필드 */}
      <Grid container spacing={3}>
        {variants.map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.key}>
            <TextField
              variant={item.key}
              label={item.label}
              placeholder={item.placeholder}
              value={values[item.key]}
              onChange={handleChange(item.key)}
              fullWidth
            />
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
                입력값:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {values[item.key] || '-'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default InputSection;
