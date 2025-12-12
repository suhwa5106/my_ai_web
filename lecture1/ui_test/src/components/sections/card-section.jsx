import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

/**
 * CardSection 컴포넌트
 *
 * MUI Card를 사용한 카드 예시
 * CardContent, CardActions 구조와 호버 효과
 *
 * Props: 없음
 *
 * Example usage:
 * <CardSection />
 */
function CardSection() {
  const cards = [
    {
      title: '기본 카드',
      description: 'MUI Card 컴포넌트의 기본 형태입니다. CardContent로 내용을 감싸고 CardActions로 버튼을 배치합니다.',
      color: 'primary'
    },
    {
      title: '호버 효과',
      description: '마우스를 올리면 그림자가 커지고 살짝 위로 올라가는 효과가 적용됩니다.',
      color: 'secondary'
    },
    {
      title: '액션 카드',
      description: '여러 개의 액션 버튼을 CardActions 영역에 배치할 수 있습니다.',
      color: 'success'
    }
  ];

  const handleClick = (title) => {
    alert(`${title} 클릭!`);
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
        Card
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  color={`${card.color}.main`}
                >
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color={card.color}
                  onClick={() => handleClick(card.title)}
                >
                  자세히 보기
                </Button>
                <Button
                  size="small"
                  color={card.color}
                  variant="contained"
                  onClick={() => handleClick(card.title)}
                >
                  선택
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardSection;
