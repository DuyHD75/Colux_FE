import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import adminApi from '../../api/modules/admin.api';

const LatestTransaction = ({ transactions = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleViewDetails = async (orderId) => {
    try {
      const { response, err } = await adminApi.getOrderDetails(orderId);
      
      if (response && response.code === 200) {
        setOrderDetails(response.data.order[0]);
        const order = transactions.find(t => t.id === orderId);
        setSelectedOrder(order);
        setOpenDialog(true);
      } else {
        console.error("Error fetching order details:", err);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 2, width: '100%', height: '550px' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Latest Transaction</Typography>
        <TableContainer sx={{ height: '550px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell 
                  width="15%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Order Code
                </TableCell>
                <TableCell 
                  width="15%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Customer Name
                </TableCell>
                <TableCell 
                  width="12%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Date
                </TableCell>
                <TableCell 
                  width="15%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Total
                </TableCell>
                <TableCell 
                  width="13%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Payment Status
                </TableCell>
                <TableCell 
                  width="15%" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  Payment Method
                </TableCell>
                <TableCell 
                  width="15%" 
                  align="center" 
                  sx={{ 
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  View Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell sx={{ color: '#1A56DB' }}>
                    #{transaction.code}
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</TableCell>
                  <TableCell>${transaction.total}</TableCell>
                  <TableCell>
                    <Box sx={{
                      bgcolor: '#DCFCE7',
                      color: '#10B981',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'inline-block',
                      fontSize: '0.875rem',
                      textAlign: 'center'
                    }}>
                      {transaction.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1 
                    }}>
                      <CreditCardIcon sx={{ fontSize: 20 }} />
                      {transaction.paymentMethod}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => handleViewDetails(transaction.id)}
                      sx={{ 
                        bgcolor: '#2196F3',
                        '&:hover': { bgcolor: '#1976D2' },
                        textTransform: 'none',
                        borderRadius: 1.5,
                        boxShadow: 'none',
                        px: 1.5,
                        py: 0.25,
                        fontSize: '0.75rem',
                        minWidth: '80px',
                        height: '24px'
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Order Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order Details</Typography>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && orderDetails && (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Order #{orderDetails.code}
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Customer Name:</Typography>
                  <Typography>{orderDetails.toName}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Order Date:</Typography>
                  <Typography>
                    {new Date(orderDetails.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Phone:</Typography>
                  <Typography>{orderDetails.toPhone}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Shipping Address:</Typography>
                  <Typography>
                    {`${orderDetails.toAddress}, ${orderDetails.toWardName}, ${orderDetails.toDistrictName}, ${orderDetails.toProvinceName}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Note:</Typography>
                  <Typography>{orderDetails.note}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Payment Method:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCardIcon sx={{ fontSize: 20 }} />
                    <Typography>{orderDetails.paymentMethod}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Status:</Typography>
                  <Box sx={{
                    bgcolor: '#DCFCE7',
                    color: '#10B981',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}>
                    {orderDetails.status}
                  </Box>
                </Box>

                {orderDetails.products && (
                  <Box>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>Order Items:</Typography>
                    {orderDetails.products.map((item, index) => (
                      <Box key={index} sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mb: 1,
                        alignItems: 'center',
                        p: 1,
                        borderRadius: 1,
                        bgcolor: '#F9FAFB'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img 
                            src={item.productDetails.productImage} 
                            alt={item.productDetails.productName}
                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <Box>
                            <Typography>{item.productDetails.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.categoryName} - {item.packageType}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography>x{item.itemQuantity}</Typography>
                        <Typography>${item.priceSell}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                <Box sx={{ 
                  display: 'grid', 
                  gap: 1,
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>${orderDetails.totalAmount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Tax:</Typography>
                    <Typography>${orderDetails.tax}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Shipping:</Typography>
                    <Typography>${orderDetails.shippingCost}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography>Total:</Typography>
                    <Typography>${orderDetails.totalPay}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LatestTransaction; 