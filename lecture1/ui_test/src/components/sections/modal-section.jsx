import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';

/**
 * ModalSection 컴포넌트
 *
 * MUI Dialog를 사용한 모달 예시
 * DialogTitle, DialogContent, DialogActions 구조
 *
 * Props: 없음
 *
 * Example usage:
 * <ModalSection />
 */
function ModalSection() {
  const [dialogs, setDialogs] = useState({
    basic: false,
    confirm: false,
    form: false
  });

  const handleOpen = (key) => () => {
    setDialogs((prev) => ({ ...prev, [key]: true }));
  };

  const handleClose = (key) => () => {
    setDialogs((prev) => ({ ...prev, [key]: false }));
  };

  const handleConfirm = () => {
    alert('확인되었습니다!');
    handleClose('confirm')();
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      {/* 섹션 타이틀 */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1
        }}
      >
        Modal (Dialog)
      </Typography>

      <Grid container spacing={2}>
        {/* 기본 모달 버튼 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            onClick={handleOpen('basic')}
            fullWidth
          >
            기본 모달 열기
          </Button>
        </Grid>

        {/* 확인 모달 버튼 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen('confirm')}
            fullWidth
          >
            확인 모달 열기
          </Button>
        </Grid>

        {/* 폼 모달 버튼 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen('form')}
            fullWidth
          >
            정보 모달 열기
          </Button>
        </Grid>
      </Grid>

      {/* 기본 Dialog */}
      <Dialog
        open={dialogs.basic}
        onClose={handleClose('basic')}
      >
        <DialogTitle>기본 모달</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이것은 기본 모달입니다. 배경을 클릭하거나 닫기 버튼을 눌러 닫을 수 있습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose('basic')}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* 확인 Dialog */}
      <Dialog
        open={dialogs.confirm}
        onClose={handleClose('confirm')}
      >
        <DialogTitle>확인 모달</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 작업을 진행하시겠습니까? 확인 버튼을 누르면 알림이 표시됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose('confirm')} color="inherit">
            취소
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 정보 Dialog */}
      <Dialog
        open={dialogs.form}
        onClose={handleClose('form')}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>정보 모달</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            MUI Dialog 컴포넌트의 주요 기능:
          </DialogContentText>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <li>DialogTitle - 모달 제목</li>
            <li>DialogContent - 모달 내용</li>
            <li>DialogActions - 버튼 영역</li>
            <li>maxWidth - 최대 너비 설정</li>
            <li>fullWidth - 전체 너비 사용</li>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose('form')} variant="outlined">
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 설명 */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        * 모달 외부(배경)를 클릭하면 모달이 닫힙니다.
      </Typography>
    </Box>
  );
}

export default ModalSection;
