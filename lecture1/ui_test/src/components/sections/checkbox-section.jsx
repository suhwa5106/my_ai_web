import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';

/**
 * CheckboxSection 컴포넌트
 *
 * MUI Checkbox와 FormControlLabel을 사용한 체크박스 예시
 * 전체 선택/해제 기능과 체크된 항목 실시간 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <CheckboxSection />
 */
function CheckboxSection() {
  const options = [
    { key: 'react', label: 'React' },
    { key: 'vue', label: 'Vue' },
    { key: 'angular', label: 'Angular' },
    { key: 'svelte', label: 'Svelte' }
  ];

  const [checked, setChecked] = useState({
    react: false,
    vue: false,
    angular: false,
    svelte: false
  });

  const handleChange = (key) => (event) => {
    setChecked((prev) => ({
      ...prev,
      [key]: event.target.checked
    }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const isAllChecked = checkedCount === options.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < options.length;

  const handleSelectAll = (event) => {
    const newValue = event.target.checked;
    setChecked({
      react: newValue,
      vue: newValue,
      angular: newValue,
      svelte: newValue
    });
  };

  const getCheckedLabels = () => {
    return options
      .filter((option) => checked[option.key])
      .map((option) => option.label);
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
        Checkbox
      </Typography>

      <Grid container spacing={3}>
        {/* 체크박스 그룹 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            좋아하는 프레임워크 선택
          </Typography>
          <FormGroup>
            {/* 전체 선택 */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllChecked}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                />
              }
              label="전체 선택"
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            />
            <Divider sx={{ my: 1 }} />
            {/* 개별 옵션 */}
            {options.map((option) => (
              <FormControlLabel
                key={option.key}
                control={
                  <Checkbox
                    checked={checked[option.key]}
                    onChange={handleChange(option.key)}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* 선택 결과 표시 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            선택된 항목
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              minHeight: 120
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              총 {checkedCount}개 선택됨
            </Typography>
            {checkedCount > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {getCheckedLabels().map((label) => (
                  <Box
                    key={label}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: 1,
                      fontSize: '0.875rem'
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                선택된 항목이 없습니다.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckboxSection;
