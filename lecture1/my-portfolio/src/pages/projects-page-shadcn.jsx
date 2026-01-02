import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Users, Briefcase, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { Progress } from '../components/ui/progress.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog.jsx';
import ProjectCardShadcn from '../components/landing/project-card-shadcn.jsx';
import { cn } from '../lib/utils.js';
import {
  fetchProjects,
  getThumbnailUrl,
  getStatusColor,
  getProgressColor,
  formatDate,
} from '../utils/projects-api.js';

/**
 * ProjectsPageShadcn 컴포넌트
 * 프로젝트 목록 페이지 - shadcn/ui 버전
 *
 * Props:
 * - 없음
 *
 * Example usage:
 * <ProjectsPageShadcn />
 */
function ProjectsPageShadcn() {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case '완료': return 'success';
      case '검토': return 'warning';
      case '진행': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] py-8 md:py-12 bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Projects
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            진행 중인 프로젝트와 완료된 작업들을 확인해보세요
          </p>

          {/* Status Stats */}
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            <Badge variant="secondary" className="px-3 py-1">
              전체 {stats.total}
            </Badge>
            <Badge variant="info" className="px-3 py-1">
              진행 {stats.inProgress}
            </Badge>
            <Badge variant="warning" className="px-3 py-1">
              검토 {stats.review}
            </Badge>
            <Badge variant="success" className="px-3 py-1">
              완료 {stats.completed}
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="전체" className="w-full mb-8" onValueChange={setSelectedStatus}>
          <TabsList className="w-full grid grid-cols-4 bg-white/90 shadow-sm">
            {statusTabs.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">
              해당 상태의 프로젝트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCardShadcn
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedProject && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <Badge variant={getStatusVariant(selectedProject.status)}>
                  {selectedProject.status}
                </Badge>
              </div>
            </DialogHeader>

            {/* Project Image */}
            <img
              src={getThumbnailUrl(selectedProject.detail_url)}
              alt={selectedProject.title}
              className="w-full h-48 md:h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=No+Preview';
              }}
            />

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {selectedProject.description}
            </p>

            <hr className="my-4" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">담당 역할</p>
                  <p className="font-medium">{selectedProject.role || '-'}</p>
                </div>
              </div>

              {/* Members */}
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">참여 멤버</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {selectedProject.members?.map((member, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        {member}
                      </Badge>
                    )) || '-'}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">일정</p>
                  <p className="font-medium">
                    {formatDate(selectedProject.start_date)} ~ {formatDate(selectedProject.expected_end_date)}
                  </p>
                  {selectedProject.actual_end_date && (
                    <p className="text-sm text-green-600 font-medium">
                      실제 완료: {formatDate(selectedProject.actual_end_date)}
                    </p>
                  )}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-start gap-3">
                <LinkIcon className="h-5 w-5 text-pink-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">첨부 링크</p>
                  <div className="flex flex-col gap-1 mt-1">
                    {selectedProject.attachment_links?.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-pink-500 hover:underline truncate"
                      >
                        {link}
                      </a>
                    )) || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">전체 진행률</span>
                <span
                  className="font-semibold"
                  style={{ color: getProgressColor(selectedProject.progress) }}
                >
                  {selectedProject.progress}%
                </span>
              </div>
              <Progress
                value={selectedProject.progress}
                className="h-2.5"
                indicatorClassName={cn(
                  selectedProject.progress >= 80 ? "bg-green-500" :
                  selectedProject.progress >= 50 ? "bg-blue-500" :
                  selectedProject.progress >= 30 ? "bg-yellow-500" : "bg-red-500"
                )}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleCloseModal}>
                닫기
              </Button>
              {selectedProject.detail_url && (
                <Button
                  onClick={() => window.open(selectedProject.detail_url, '_blank')}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  사이트 방문
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default ProjectsPageShadcn;
