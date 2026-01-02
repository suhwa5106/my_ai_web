import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import {
  getThumbnailUrl,
  getStatusColor,
  getProgressColor,
  formatDate,
} from '../../utils/projects-api.js';

/**
 * ProjectCard 컴포넌트
 *
 * Props:
 * @param {Object} project - 프로젝트 데이터 객체 [Required]
 * @param {function} onClick - 카드 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <ProjectCard project={projectData} onClick={handleClick} />
 */
function ProjectCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const statusColor = getStatusColor(project.status);
  const progressColor = getProgressColor(project.progress);
  const thumbnailUrl = getThumbnailUrl(project.detail_url);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    if (project.detail_url) {
      window.open(project.detail_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'none',
          boxShadow: onClick ? '0 8px 24px rgba(232, 74, 138, 0.15)' : undefined,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{ height: { xs: 140, md: 160 } }}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          sx={{
            height: { xs: 140, md: 160 },
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
          }}
          image={imageError ? 'https://via.placeholder.com/400x300?text=No+Preview' : thumbnailUrl}
          alt={project.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Chip
            label={project.status}
            size="small"
            sx={{
              backgroundColor: statusColor.bg,
              color: statusColor.text,
              border: `1px solid ${statusColor.border}`,
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
          {project.detail_url && (
            <Tooltip title="사이트 방문">
              <IconButton
                size="small"
                onClick={handleLinkClick}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            mb: 2,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1,
          }}
        >
          {project.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <WorkIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
          <Typography
            variant="body2"
            sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
          >
            {project.role || '역할 미정'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
          <Typography
            variant="body2"
            sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
          >
            {formatDate(project.start_date)} ~ {formatDate(project.expected_end_date)}
          </Typography>
        </Box>

        {project.members && project.members.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <GroupIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {project.members.slice(0, 3).map((member, index) => (
                <Chip
                  key={index}
                  label={member}
                  size="small"
                  sx={{
                    height: '20px',
                    fontSize: '0.7rem',
                    backgroundColor: 'rgba(139, 111, 192, 0.1)',
                    color: 'secondary.main',
                  }}
                />
              ))}
              {project.members.length > 3 && (
                <Chip
                  label={`+${project.members.length - 3}`}
                  size="small"
                  sx={{
                    height: '20px',
                    fontSize: '0.7rem',
                    backgroundColor: 'rgba(139, 111, 192, 0.1)',
                    color: 'secondary.main',
                  }}
                />
              )}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography
              variant="body2"
              sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
            >
              진행률
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '0.75rem', fontWeight: 600, color: progressColor }}
            >
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                backgroundColor: progressColor,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
