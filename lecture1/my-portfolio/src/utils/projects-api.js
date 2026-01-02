import { supabase } from './supabase.js';

/**
 * 썸네일 URL 생성 함수
 * image.thum.io API를 사용하여 사이트 스크린샷 자동 생성
 *
 * @param {string} url - 프로젝트 사이트 URL
 * @returns {string} - 썸네일 이미지 URL
 */
export const getThumbnailUrl = (url) => {
  if (!url) {
    return 'https://via.placeholder.com/400x300?text=No+Preview';
  }
  return `https://image.thum.io/get/${url}`;
};

/**
 * 모든 프로젝트 조회
 *
 * @param {string} status - 상태 필터 (진행/검토/완료/전체) [Optional]
 * @returns {Promise<{data: Array, error: Error}>}
 */
export const fetchProjects = async (status = '전체') => {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (status !== '전체') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('프로젝트 조회 오류:', err);
    return { data: null, error: err };
  }
};

/**
 * 단일 프로젝트 조회
 *
 * @param {number} id - 프로젝트 ID
 * @returns {Promise<{data: Object, error: Error}>}
 */
export const fetchProjectById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('프로젝트 조회 오류:', err);
    return { data: null, error: err };
  }
};

/**
 * 진행 상태별 색상 반환
 *
 * @param {string} status - 진행 상태
 * @returns {Object} - MUI 색상 객체
 */
export const getStatusColor = (status) => {
  switch (status) {
    case '완료':
      return { bg: '#E8F5E9', text: '#2E7D32', border: '#4CAF50' };
    case '검토':
      return { bg: '#FFF3E0', text: '#E65100', border: '#FF9800' };
    case '진행':
      return { bg: '#E3F2FD', text: '#1565C0', border: '#2196F3' };
    default:
      return { bg: '#F5F5F5', text: '#757575', border: '#9E9E9E' };
  }
};

/**
 * 진행률에 따른 색상 반환
 *
 * @param {number} progress - 진행률 (0-100)
 * @returns {string} - 색상 코드
 */
export const getProgressColor = (progress) => {
  if (progress >= 80) {
    return '#4CAF50';
  }
  if (progress >= 50) {
    return '#FF9800';
  }
  return '#E84A8A';
};

/**
 * 날짜 포맷팅 함수
 *
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} - 포맷팅된 날짜
 */
export const formatDate = (dateString) => {
  if (!dateString) {
    return '-';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
