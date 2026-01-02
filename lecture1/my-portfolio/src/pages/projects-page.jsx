import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import ProjectCard from '../components/landing/project-card.jsx';
import {
  fetchProjects,
  getThumbnailUrl,
  getStatusColor,
  getProgressColor,
  formatDate,
} from '../utils/projects-api.js';

/**
 * ProjectsPage 컴포넌트
 * 프로젝트 목록 페이지 - 필터링 및 상세 정보 모달 포함
 *
 * Props:
 * - 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusTabs = ['전체', '진행', '검토', '완료'];

  useEffect(() => {
    loadProjects(selectedStatus);
  }, [selectedStatus]);

  const loadProjects = async (status) => {
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchProjects(status);

    if (fetchError) {
      setError('프로젝트를 불러오는데 실패했습니다.');
    } else {
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedStatus(statusTabs[newValue]);
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getStatusStats = () => {
    const stats = {
      total: projects.length,
      inProgress: projects.filter((p) => p.status === '진행').length,
      review: projects.filter((p) => p.status === '검토').length,
      completed: projects.filter((p) => p.status === '완료').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 6 },
        background: 'linear-gradient(180deg, #FFF8F8 0%, #FADADD 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            진행 중인 프로젝트와 완료된 작업들을 확인해보세요
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              mb: 3,
            }}
          >
            <Chip
              label={'전체 ' + stats.total}
              sx={{ backgroundColor: '#F5F5F5', fontWeight: 500 }}
            />
            <Chip
              label={'진행 ' + stats.inProgress}
              sx={{ backgroundColor: '#E3F2FD', color: '#1565C0', fontWeight: 500 }}
            />
            <Chip
              label={'검토 ' + stats.review}
              sx={{ backgroundColor: '#FFF3E0', color: '#E65100', fontWeight: 500 }}
            />
            <Chip
              label={'완료 ' + stats.completed}
              sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 500 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            mb: 4,
            boxShadow: '0 2px 8px rgba(232, 74, 138, 0.1)',
          }}
        >
          <Tabs
            value={statusTabs.indexOf(selectedStatus)}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 500,
                fontSize: { xs: '0.9rem', md: '1rem' },
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
              },
            }}
          >
            {statusTabs.map((status) => (
              <Tab key={status} label={status} />
            ))}
          </Tabs>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.secondary',
              }}
            >
              해당 상태의 프로젝트가 없습니다.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                pb: 1,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
                >
                  {selectedProject.title}
                </Typography>
                <Chip
                  label={selectedProject.status}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(selectedProject.status).bg,
                    color: getStatusColor(selectedProject.status).text,
                    border: '1px solid ' + getStatusColor(selectedProject.status).border,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <IconButton onClick={handleCloseModal} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                component="img"
                src={getThumbnailUrl(selectedProject.detail_url)}
                alt={selectedProject.title}
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 300 },
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 3,
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=No+Preview';
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                {selectedProject.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <WorkIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        담당 역할
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedProject.role || '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <GroupIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        참여 멤버
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                        {selectedProject.members?.map((member, index) => (
                          <Chip
                            key={index}
                            label={member}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(139, 111, 192, 0.1)',
                              color: 'secondary.main',
                            }}
                          />
                        )) || '-'}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        일정
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatDate(selectedProject.start_date)} ~ {formatDate(selectedProject.expected_end_date)}
                      </Typography>
                      {selectedProject.actual_end_date && (
                        <Typography
                          variant="body2"
                          sx={{ color: 'success.main', fontWeight: 500 }}
                        >
                          실제 완료: {formatDate(selectedProject.actual_end_date)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LinkIcon sx={{ color: 'primary.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        첨부 링크
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                        {selectedProject.attachment_links?.map((link, index) => (
                          <Typography
                            key={index}
                            component="a"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: '0.85rem',
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {link}
                          </Typography>
                        )) || '-'}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        전체 진행률
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: getProgressColor(selectedProject.progress),
                        }}
                      >
                        {selectedProject.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={selectedProject.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          backgroundColor: getProgressColor(selectedProject.progress),
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseModal} color="inherit">
                닫기
              </Button>
              {selectedProject.detail_url && (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<LaunchIcon />}
                  onClick={() => window.open(selectedProject.detail_url, '_blank')}
                >
                  사이트 방문
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default ProjectsPage;
