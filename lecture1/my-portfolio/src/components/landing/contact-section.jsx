import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';

/**
 * ContactSection 컴포넌트
 *
 * Props:
 * - 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #FDF5F5 0%, #FADADD 100%)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
            textAlign: 'center',
          }}
        >
          Contact
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'text.secondary',
            lineHeight: 1.6,
            textAlign: 'center',
            mb: 4,
          }}
        >
          방문해 주셔서 감사합니다. 방명록을 남겨주세요!
        </Typography>

        <GuestbookForm onSubmitSuccess={handleSubmitSuccess} />
        <GuestbookList refreshTrigger={refreshTrigger} />
      </Container>
    </Box>
  );
}

export default ContactSection;
