import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuth } from '../hooks/useAuth';

/**
 * LoginPage 컴포넌트 (로그인 페이지)
 *
 * 구성 요소:
 * - 로고
 * - 아이디 입력란
 * - 비밀번호 입력란
 * - 로그인 버튼
 * - 아이디/비밀번호 찾기 링크
 * - 회원가입 버튼
 *
 * Example usage:
 * <LoginPage />
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '28px', md: '32px' },
            }}
          >
            MySocial
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            <TextField
              fullWidth
              name="username"
              placeholder="아이디를 입력하세요"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || !formData.username || !formData.password}
              sx={{ mb: 2 }}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              component={Link}
              to="/find-id"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              아이디 찾기
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.300' }}>
              |
            </Typography>
            <Typography
              variant="body2"
              component={Link}
              to="/find-password"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              비밀번호 찾기
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/register')}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
