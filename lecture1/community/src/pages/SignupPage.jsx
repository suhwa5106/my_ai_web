import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from '../hooks/useAuth';

/**
 * SignupPage 컴포넌트
 * 사용자 회원가입 페이지
 *
 * Example usage:
 * <SignupPage />
 */
function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (username.length < 4) {
      setError('아이디는 4자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(username, password, nickname);

    if (signUpError) {
      setError(signUpError.message || '회원가입에 실패했습니다.');
      setLoading(false);
      return;
    }

    setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 2, md: 4 },
            boxShadow: '0 8px 32px rgba(139, 115, 85, 0.15)',
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <PetsIcon
                sx={{
                  fontSize: 60,
                  color: 'primary.main',
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  textAlign: 'center',
                }}
              >
                회원가입
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 1,
                }}
              >
                Dog Cube 커뮤니티에 가입하세요
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                helperText="4자 이상 입력해주세요"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="6자 이상 입력해주세요"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  이미 계정이 있으신가요?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#8B7355',
                      fontWeight: 600,
                      textDecoration: 'underline',
                    }}
                  >
                    로그인
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SignupPage;
