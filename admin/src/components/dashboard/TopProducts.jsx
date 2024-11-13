import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TopProducts = ({ products }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, width: '100%', height: '550px' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Top Products</Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                width="40%"
                sx={{ 
                  backgroundColor: '#F9FAFB',
                  fontWeight: 600,
                  borderBottom: '1px solid #E5E7EB'
                }}
              >
                Product Name
              </TableCell>
              <TableCell 
                width="20%"
                sx={{ 
                  backgroundColor: '#F9FAFB',
                  fontWeight: 600,
                  borderBottom: '1px solid #E5E7EB'
                }}
              >
                Category
              </TableCell>
              
              <TableCell 
                width="10%"
                align="right"
                sx={{ 
                  backgroundColor: '#F9FAFB',
                  fontWeight: 600,
                  borderBottom: '1px solid #E5E7EB'
                }}
              >
                Sold
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={product.image} alt={product.name} style={{ width: 40, height: 40 }} />
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">{product.sold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopProducts; 