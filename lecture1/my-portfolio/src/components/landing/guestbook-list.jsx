import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { supabase } from '../../utils/supabase.js';

/**
 * GuestbookList 컴포넌트
 *
 * Props:
 * @param {number} refreshTrigger - 목록 새로고침 트리거 [Optional]
 *
 * Example usage:
 * <GuestbookList refreshTrigger={refreshCount} />
 */
function GuestbookList({ refreshTrigger }) {
  const [guestbooks, setGuestbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGuestbooks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setGuestbooks(data || []);
    } catch (err) {
      setError('방명록을 불러오는데 실패했습니다.');
      console.error('Guestbook fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestbooks();
  }, [refreshTrigger]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        sx={{
          color: 'error.main',
          textAlign: 'center',
          py: 4,
        }}
      >
        {error}
      </Typography>
    );
  }

  if (guestbooks.length === 0) {
    return (
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ color: 'text.secondary' }}>
            아직 작성된 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '1.2rem', md: '1.4rem' },
          fontWeight: 600,
          color: 'primary.main',
          mb: 3,
        }}
      >
        방명록 목록 ({guestbooks.length}개)
      </Typography>

      <Grid container spacing={2}>
        {guestbooks.map((item) => (
          <Grid size={{ xs: 12, md: 6 }} key={item.id}>
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(232, 74, 138, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                      }}
                    >
                      {item.author_name}
                    </Typography>
                    {item.job && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <WorkIcon sx={{ color: 'secondary.main', fontSize: '0.9rem' }} />
                        <Typography
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                          }}
                        >
                          {item.job}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: 'primary.main',
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    lineHeight: 1.6,
                    mb: 2,
                    minHeight: { xs: 'auto', md: '48px' },
                  }}
                >
                  {item.content}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ color: 'text.disabled', fontSize: '0.85rem' }} />
                    <Typography
                      sx={{
                        color: 'text.disabled',
                        fontSize: '0.75rem',
                      }}
                    >
                      {formatDate(item.created_at)}
                    </Typography>
                  </Box>
                  {item.contact && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ContactPhoneIcon sx={{ color: 'secondary.main', fontSize: '0.85rem' }} />
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                        }}
                      >
                        {item.contact}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GuestbookList;
