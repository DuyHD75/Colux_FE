import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";

const ProductModal = ({
  open,
  handleClose,
  products,
  handleProductSelect,
  title,
  productType,
  totalElements,
  size,
  page: currentPage,
  onPageChange,
}) => {

  const { t } = useTranslation();
  const [page, setPage] = useState(currentPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    if (onPageChange) {
      onPageChange(newPage + 1);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "800px" },
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{...textConfigs.style.basicFont,}}>
          {title}
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <TableContainer
          sx={{
            maxHeight: "60vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "scroll",
              paddingRight: "8px",
            }}
          >
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
                body {
                  scrollbar-width: none;
                }
              `}
            </style>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{...textConfigs.style.basicFont,}}>{t("image")}</TableCell>
                  <TableCell sx={{...textConfigs.style.basicFont,}}>{t("name")}</TableCell>
                  <TableCell sx={{...textConfigs.style.basicFont,}}>{t("handle")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={product.images.length > 0 ? product.images[0].url : ""}
                        alt={product.productName}
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell sx={{...textConfigs.style.basicFont,}}>{product.productName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleProductSelect(product, productType);
                          handleClose();
                        }}
                        sx={{...textConfigs.style.basicFont,}}
                      >
                        {t("select")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={totalElements}
          rowsPerPage={size}
          page={page - 1}
          onPageChange={handleChangePage}
          labelDisplayedRows={({ from, to, count }) => (
            <span style={{...textConfigs.style.basicFont,}}>{`${from}-${to} ${t("of")} ${count}`}</span>
          )}
        />
      </Box>
    </Modal>
  );
};

export default ProductModal;
