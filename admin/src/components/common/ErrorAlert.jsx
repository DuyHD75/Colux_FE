import { Alert, AlertTitle, Box, Button } from '@mui/material';

const ErrorAlert = ({ error, onRetry }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Thử lại
            </Button>
          )
        }
      >
        <AlertTitle>Lỗi</AlertTitle>
        {error || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;