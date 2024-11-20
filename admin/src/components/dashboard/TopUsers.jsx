import { Box, Typography, Avatar, Stack, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const users = [
  {
    name: 'Lê Văn Hải',
    location: 'Điện Bàn',
    avatar: '/avatars/avatar-1.jpg',
    status: 'Cancel',
    amount: 250.00,
    trend: 'up'
  },
  {
    name: 'Nguyễn Như Ý',
    location: 'Tam Kỳ',
    avatar: '/avatars/avatar-2.jpg',
    status: 'Success',
    amount: 110.00,
    trend: 'down'
  },
  {
    name: 'Nguyễn Văn Tài',
    location: 'Huế',
    avatar: '/avatars/avatar-3.jpg',
    status: 'Active',
    amount: 420.00,
    trend: 'up'
  },
  {
    name: 'Lê Tường Vi',
    location: 'Huế',
    avatar: '/avatars/avatar-4.jpg',
    status: 'Pending',
    amount: 120.00,
    trend: 'down'
  },
  {
    name: 'Đỗ Anh Thư',
    location: 'Đà Nẵng', 
    avatar: '/avatars/avatar-5.jpg',
    status: 'Active',
    amount: 112.00,
    trend: 'up'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Cancel':
      return '#FCA5A5';
    case 'Success':
      return '#86EFAC';
    case 'Active':
      return '#93C5FD';
    case 'Pending':
      return '#FCD34D';
    default:
      return '#E5E7EB';
  }
};

const TopUsers = () => {
  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        height: 600,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Top Users
        </Typography>
      </Box>

      <Stack spacing={2}>
        {users.map((user) => (
          <Box
            key={user.name}
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={user.avatar} alt={user.name} />
              <Box>
                <Typography variant="subtitle2">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.location}
                </Typography>
              </Box>
            </Box>
            
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: getStatusColor(user.status),
                color: 'white',
                fontSize: '0.75rem',
                width: 'fit-content',
                textAlign: 'center',
                minWidth: 60
              }}
            >
              {user.status}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-start' }}>
              {user.trend === 'up' ? (
                <TrendingUpIcon sx={{ color: '#10B981', fontSize: '1.25rem' }} />
              ) : (
                <TrendingDownIcon sx={{ color: '#EF4444', fontSize: '1.25rem' }} />
              )}
              <Typography variant="subtitle2">${user.amount}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopUsers; 