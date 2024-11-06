import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit} className="mx-auto mt-6">
        <Typography
          className="text-center"
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "Nunito",
            ...textConfigs.style.headerText,
            marginBottom: 5,
            fontSize: "30px", fontWeight: "bold"
          }}
        >
          {t('home.contact.title')}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Nunito",
                fontSize: "1.4rem",
                ...textConfigs.style.headerText,
                marginY: 2,
              }}
            >
              17, Dao Duy Tu, Vinh Trung, Thanh Khe, Da Nang, Viet Nam
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Nunito",
                fontSize: "1.4rem",
                ...textConfigs.style.headerText,
                marginY: 2,
              }}
            >
              Email: coluxalpha@gmail.com
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Nunito",
                fontSize: "1.4rem",
                ...textConfigs.style.headerText,
                marginY: 2,
              }}
            >
              {t('home.contact.phone')}: 0327113934
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8} spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="name"
                label={t('home.contact.input.name')}
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                sx={{ marginY: { sx: 0, md: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label={t('home.contact.input.email')}
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                sx={{ marginY: { sx: 0, md: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="message"
                label={t('home.contact.input.mess')}
                multiline
                rows={4}
                variant="outlined"
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                ...backgroundConfigs.style.backgroundPrimary,
                ...textConfigs.style.normalText,
                paddingX: 5,
                width: "240px",
                marginBottom: 5,
                ":hover": { ...backgroundConfigs.style.backgroundSecondary },
              }}
            >
              {t('home.contact.btn')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
