import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../components/common/Navbar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

/**
 * WritePage 컴포넌트
 * 게시물 작성 페이지
 *
 * Example usage:
 * <WritePage />
 */
function WritePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const nickname = user.user_metadata?.nickname || user.email?.split('@')[0] || '익명';

      const { error: insertError } = await supabase.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl,
        user_id: user.id,
        author_nickname: nickname,
      });

      if (insertError) {
        throw insertError;
      }

      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('게시물 작성에 실패했습니다. 다시 시도해주세요.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2, color: 'text.secondary' }}
        >
          뒤로가기
        </Button>

        <Card>
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              게시물 작성
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                multiline
                rows={10}
                sx={{ mb: 3 }}
              />

              <Box sx={{ mb: 3 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<ImageIcon />}
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                    }}
                  >
                    이미지 첨부
                  </Button>
                </label>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  최대 5MB
                </Typography>
              </Box>

              {imagePreview && (
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    mb: 3,
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="미리보기"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 300,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <IconButton
                    onClick={removeImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/')}
                  sx={{ flex: 1 }}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ flex: 1 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : '게시물 등록'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default WritePage;
