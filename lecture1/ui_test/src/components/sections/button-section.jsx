import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * ButtonSection 컴포넌트
 *
 * MUI Button의 다양한 variant와 color 조합을 보여주는 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <ButtonSection />
 */
function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`${variant} + ${color} 버튼이 클릭되었습니다!`);
  };

  const variants = ['contained', 'outlined', 'text'];
  const colors = ['primary', 'secondary', 'error'];

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
        Button
      </Typography>

      {/* Variant별 버튼 그룹 */}
      <Grid container spacing={3}>
        {variants.map((variant) => (
          <Grid size={{ xs: 12, md: 4 }} key={variant}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: 'medium', color: 'text.secondary' }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {colors.map((color) => (
                <Button
                  key={`${variant}-${color}`}
                  variant={variant}
                  color={color}
                  onClick={() => handleClick(variant, color)}
                  sx={{ textTransform: 'none' }}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ButtonSection;
