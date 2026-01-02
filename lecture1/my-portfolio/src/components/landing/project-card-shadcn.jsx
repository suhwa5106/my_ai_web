import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../ui/card.jsx';
import { Badge } from '../ui/badge.jsx';
import { Progress } from '../ui/progress.jsx';
import { Skeleton } from '../ui/skeleton.jsx';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip.jsx';
import { cn } from '../../lib/utils.js';
import {
  getThumbnailUrl,
  getStatusColor,
  getProgressColor,
  formatDate,
} from '../../utils/projects-api.js';

/**
 * ProjectCardShadcn 컴포넌트
 *
 * Props:
 * @param {Object} project - 프로젝트 데이터 객체 [Required]
 * @param {function} onClick - 카드 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <ProjectCardShadcn project={projectData} onClick={handleClick} />
 */
function ProjectCardShadcn({ project, onClick }) {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case '완료': return 'success';
      case '검토': return 'warning';
      case '진행': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <TooltipProvider>
      <Card
        onClick={onClick}
        className={cn(
          "h-full flex flex-col overflow-hidden transition-all duration-200",
          onClick && "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-200/50"
        )}
      >
        <div className="relative">
          {!imageLoaded && (
            <Skeleton className="h-36 md:h-40 w-full" />
          )}
          <img
            src={imageError ? 'https://via.placeholder.com/400x300?text=No+Preview' : thumbnailUrl}
            alt={project.title}
            className={cn(
              "h-36 md:h-40 w-full object-cover",
              !imageLoaded && "hidden"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
            {project.detail_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLinkClick}
                    className="p-1.5 rounded-full bg-white/90 hover:bg-pink-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>사이트 방문</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <CardContent className="flex-grow flex flex-col p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 truncate">
            {project.title}
          </h3>

          <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">
            {project.description}
          </p>

          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Briefcase className="h-4 w-4" />
            <span className="text-xs">{project.role || '역할 미정'}</span>
          </div>

          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">
              {formatDate(project.start_date)} ~ {formatDate(project.expected_end_date)}
            </span>
          </div>

          {project.members && project.members.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-gray-500" />
              <div className="flex gap-1 flex-wrap">
                {project.members.slice(0, 3).map((member, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs py-0 bg-purple-100 text-purple-700"
                  >
                    {member}
                  </Badge>
                ))}
                {project.members.length > 3 && (
                  <Badge variant="secondary" className="text-xs py-0 bg-purple-100 text-purple-700">
                    +{project.members.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">진행률</span>
              <span className="text-xs font-semibold" style={{ color: progressColor }}>
                {project.progress}%
              </span>
            </div>
            <Progress
              value={project.progress}
              className="h-1.5"
              indicatorClassName={cn(
                project.progress >= 80 ? "bg-green-500" :
                project.progress >= 50 ? "bg-blue-500" :
                project.progress >= 30 ? "bg-yellow-500" : "bg-red-500"
              )}
            />
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default ProjectCardShadcn;
