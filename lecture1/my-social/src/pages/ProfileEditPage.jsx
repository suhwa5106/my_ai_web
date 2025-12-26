import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks/useAuth';

/**
 * ProfileEditPage 컴포넌트 (프로필 편집 페이지)
 *
 * 구성 요소:
 * - 헤더 (뒤로가기, 제목, 완료)
 * - 프로필 이미지 변경
 * - 닉네임 수정
 * - 바이오 수정
 *
 * Example usage:
 * <ProfileEditPage />
 */
function ProfileEditPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nickname: user?.nickname || '',
    bio: user?.bio || '',
    profile_image: user?.profile_image || null,
  });
  const [previewImage, setPreviewImage] = useState(user?.profile_image || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPreviewImage(base64);
      setFormData((prev) => ({
        ...prev,
        profile_image: base64,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.nickname.trim()) return;

    setIsSaving(true);

    // 사용자 정보 업데이트
    updateUser({
      nickname: formData.nickname,
      bio: formData.bio,
      profile_image: formData.profile_image,
    });

    // users 로컬 스토리지 업데이트
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = storedUsers.findIndex((u) => u.id === user?.id);

    if (userIndex !== -1) {
      storedUsers[userIndex] = {
        ...storedUsers[userIndex],
        nickname: formData.nickname,
        bio: formData.bio,
        profile_image: formData.profile_image,
      };
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    setIsSaving(false);
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2">프로필 편집</Typography>
        </Box>
        <Button
          variant="text"
          color="primary"
          disabled={!formData.nickname.trim() || isSaving}
          onClick={handleSave}
          sx={{ fontWeight: 600 }}
        >
          {isSaving ? '저장 중...' : '완료'}
        </Button>
      </Box>

      {/* 콘텐츠 */}
      <Box sx={{ p: 3 }}>
        {/* 프로필 이미지 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Avatar
            src={previewImage}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
            }}
          >
            {formData.nickname?.charAt(0)}
          </Avatar>
          <Button
            variant="text"
            color="primary"
            onClick={() => fileInputRef.current?.click()}
            sx={{ fontWeight: 600 }}
          >
            프로필 사진 변경
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </Box>

        {/* 닉네임 */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            닉네임
          </Typography>
          <TextField
            fullWidth
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
          />
        </Box>

        {/* 바이오 */}
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            바이오
          </Typography>
          <TextField
            fullWidth
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="자기소개를 입력하세요"
            multiline
            rows={4}
            inputProps={{ maxLength: 150 }}
            helperText={`${formData.bio.length}/150`}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileEditPage;
