import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../hooks/useAuth';

/**
 * RegisterPage 컴포넌트 (회원가입 페이지)
 *
 * 구성 요소:
 * - 로고
 * - 아이디 입력란
 * - 비밀번호 입력란
 * - 비밀번호 확인 입력란
 * - 닉네임 입력란
 * - 회원가입 버튼
 *
 * Example usage:
 * <RegisterPage />
 */
function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
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

  const validateForm = () => {
    if (formData.username.length < 4) {
      setError('아이디는 4자 이상이어야 합니다.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (formData.nickname.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await register({
      username: formData.username,
      password: formData.password,
      nickname: formData.nickname,
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const isFormValid =
    formData.username &&
    formData.password &&
    formData.passwordConfirm &&
    formData.nickname;

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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <IconButton
              onClick={() => navigate('/login')}
              sx={{ mr: 1 }}
              aria-label="뒤로가기"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h2">회원가입</Typography>
          </Box>

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
              helperText="4자 이상"
            />

            <TextField
              fullWidth
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              helperText="6자 이상"
            />

            <TextField
              fullWidth
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleChange}
              sx={{ mb: 3 }}
              helperText="2자 이상"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              이미 계정이 있으신가요?{' '}
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                로그인
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
