import { Card, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import PercentIcon from '@mui/icons-material/Percent';
import BusinessIcon from '@mui/icons-material/Business';
import AppleIcon from '@mui/icons-material/Apple';

const StatCard = ({ type, title, value }) => {
  const getIcon = () => {
    const iconProps = { 
      sx: { 
        fontSize: 24,
        color: 'text.secondary'
      }
    };

    switch (type) {
      case 'customers':
        return <PeopleIcon {...iconProps} />;
      case 'products':
        return <InventoryIcon {...iconProps} />;
      case 'orders':
        return <ReceiptIcon {...iconProps} />;
      case 'delivery':
        return <LocalShippingIcon {...iconProps} />;
      case 'ratings':
        return <StarIcon {...iconProps} />;
      case 'promotions':
        return <PercentIcon {...iconProps} />;
      case 'suppliers':
        return <BusinessIcon {...iconProps} />;
      case 'brands':
        return <AppleIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'customers':
        return '#EBF5FF';
      case 'products':
        return '#FFF5EB';
      case 'orders':
        return '#EBFFF4';
      case 'delivery':
        return '#F9EBFF';
      case 'ratings':
        return '#FFFBEB';
      case 'promotions':
        return '#FFE8E8';
      case 'suppliers':
        return '#EBF5FF';
      case 'brands':
        return '#EBF5FF';
      default:
        return '#ffffff';
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        p: 2,
        borderRadius: 2,
        bgcolor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Box 
        sx={{ 
          p: 2,
          borderRadius: 2,
          bgcolor: getBackgroundColor(),
          height: '100%'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getIcon()}
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;
