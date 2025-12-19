import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabase.js';

/**
 * GuestbookForm 컴포넌트
 *
 * Props:
 * @param {function} onSubmitSuccess - 방명록 작성 성공 시 호출되는 콜백 함수 [Optional]
 *
 * Example usage:
 * <GuestbookForm onSubmitSuccess={handleRefresh} />
 */
function GuestbookForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    author_name: '',
    job: '',
    content: '',
    rating: 5,
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue || 5,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('guestbook')
        .insert([formData]);

      if (insertError) {
        throw insertError;
      }

      setFormData({
        author_name: '',
        job: '',
        content: '',
        rating: 5,
        contact: '',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError('방명록 작성에 실패했습니다. 다시 시도해주세요.');
      console.error('Guestbook submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            fontWeight: 600,
            color: 'primary.main',
            mb: 3,
          }}
        >
          방명록 작성
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                required
                name="author_name"
                label="이름"
                value={formData.author_name}
                onChange={handleChange}
                disabled={isSubmitting}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="job"
                label="직업"
                value={formData.job}
                onChange={handleChange}
                disabled={isSubmitting}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="contact"
                label="연락처 (이메일 또는 전화번호)"
                value={formData.contact}
                onChange={handleChange}
                disabled={isSubmitting}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                <Typography
                  component="legend"
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    mr: 2,
                  }}
                >
                  별점
                </Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                name="content"
                label="내용"
                value={formData.content}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="방명록을 남겨주세요!"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              {error && (
                <Typography
                  sx={{
                    color: 'error.main',
                    fontSize: '0.875rem',
                    mb: 1,
                  }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  px: 4,
                  py: 1,
                }}
              >
                {isSubmitting ? '작성 중...' : '작성하기'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GuestbookForm;
