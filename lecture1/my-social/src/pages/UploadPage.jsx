import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

/**
 * UploadPage 컴포넌트 (게시물 업로드 페이지)
 *
 * 구성 요소:
 * - 헤더 (뒤로가기, 제목, 공유 버튼)
 * - 이미지 선택 영역
 * - 캡션 입력
 * - 위치 추가
 *
 * Example usage:
 * <UploadPage />
 */
function UploadPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleUpload = async () => {
    if (images.length === 0) return;

    setIsUploading(true);

    try {
      // 첫 번째 이미지를 Base64로 변환
      const imageUrl = await fileToBase64(images[0].file);

      // Supabase에 게시물 저장
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: currentUser?.id,
          title: location || '',
          content: caption,
          image_url: imageUrl,
          author_nickname: currentUser?.nickname || '',
        }])
        .select()
        .single();

      if (error) {
        console.error('Upload error:', error);
        alert('게시물 업로드에 실패했습니다.');
        setIsUploading(false);
        return;
      }

      setIsUploading(false);
      navigate('/');
    } catch (err) {
      console.error('Upload error:', err);
      alert('게시물 업로드 중 오류가 발생했습니다.');
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
          <Typography variant="h2">새 게시물</Typography>
        </Box>
        <Button
          variant="text"
          color="primary"
          disabled={images.length === 0 || isUploading}
          onClick={handleUpload}
          sx={{ fontWeight: 600 }}
        >
          {isUploading ? '업로드 중...' : '공유'}
        </Button>
      </Box>

      {/* 콘텐츠 */}
      <Box sx={{ p: 2 }}>
        {/* 이미지 선택 영역 */}
        {images.length === 0 ? (
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: '100%',
              height: 300,
              bgcolor: 'grey.100',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              mb: 3,
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            <AddPhotoAlternateIcon
              sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
            />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              사진을 선택하세요
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 3 }}>
            {/* 이미지 미리보기 */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    minWidth: 100,
                    height: 100,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={img.preview}
                    alt={`미리보기 ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                      p: 0.5,
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}

              {/* 추가 버튼 */}
              {images.length < 10 && (
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    minWidth: 100,
                    height: 100,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  <AddPhotoAlternateIcon sx={{ color: 'text.secondary' }} />
                </Box>
              )}
            </Box>
          </Box>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* 캡션 입력 */}
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="문구를 입력하세요..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 위치 추가 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
          }}
        >
          <LocationOnIcon sx={{ color: 'text.secondary', mr: 2 }} />
          <TextField
            fullWidth
            variant="standard"
            placeholder="위치 추가"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UploadPage;
