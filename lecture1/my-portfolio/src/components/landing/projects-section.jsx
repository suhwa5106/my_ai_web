import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

/**
 * ProjectsSection 컴포넌트
 *
 * Props:
 * - 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: '#FFF8F8',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
              }}
            >
              Projects
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/projects"
              sx={{ px: 4, py: 1 }}
            >
              더 보기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
