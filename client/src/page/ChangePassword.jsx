import React, { useState } from "react";
import UserSidebar from "../components/commons/UserSidebar";
import { Box, Button, Grid, Typography } from "@mui/material";
import textConfigs from "../config/text.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import customerApi from "../api/modules/customer.api";
import userApi from "../api/modules/user.api";

const ChangePassword = () => {
//   const [errorMessage, setErrorMessage] = useState();


  const formikPassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .required("Required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match!")
        .min(8, "Password must be at least 8 characters!")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values) => {
    //   setErrorMessage(undefined);
      const { response, err } = await customerApi.changePassword(values);

      if (response && response.code === 200) {
        formikPassword.resetForm();
        toast.success(response.message);
      } 
      if (err) {
        // setErrorMessage(err.exception);
        console.log(err.exception);
        toast.error(err.exception);
      }
    },
  });
  return (
    <UserSidebar>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          height: "100%",
          bgcolor: "white",
          borderRadius: "8px",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            ...textConfigs.style.headerText,
            fontWeight: "bold",
            fontSize: "20px",
            mb: "1rem",
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "12px",
            border: "1px solid #E5E5E5",
            mb: "1rem",
          }}
        >
          <Typography
            sx={{
              ...textConfigs.style.headerText,
              fontWeight: "bold",
              fontSize: "16px",
              mb: "10px",
            }}
          >
            Password
          </Typography>

          <form onSubmit={formikPassword.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography
                  sx={{
                    ...textConfigs.style.headerText,
                    fontSize: "14px",
                    color: "text.secondary",
                    paddingLeft: "10px",
                  }}
                >
                  Old Password
                </Typography>
                <input
                  name="oldPassword"
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.oldPassword}
                  type="password"
                  placeholder="Old Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #E5E5E5",
                  }}
                />
                {formikPassword.touched.oldPassword &&
                formikPassword.errors.oldPassword ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formikPassword.errors.oldPassword}
                  </div>
                ) : null}
              </Grid>
              <Grid item md={6}>
                <Typography
                  sx={{
                    ...textConfigs.style.headerText,
                    fontSize: "14px",
                    color: "text.secondary",
                    paddingLeft: "10px",
                  }}
                >
                  New Password
                </Typography>
                <input
                  name="newPassword"
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.newPassword}
                  type="password"
                  placeholder="New Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #E5E5E5",
                  }}
                />
                {formikPassword.touched.newPassword &&
                formikPassword.errors.newPassword ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formikPassword.errors.newPassword}
                  </div>
                ) : null}
              </Grid>
              <Grid item md={6}>
                <Typography
                  sx={{
                    ...textConfigs.style.headerText,
                    fontSize: "14px",
                    color: "text.secondary",
                    paddingLeft: "10px",
                  }}
                >
                  Confirm Password
                </Typography>
                <input
                  name="confirmPassword"
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #E5E5E5",
                  }}
                />
                {formikPassword.touched.confirmPassword &&
                formikPassword.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formikPassword.errors.confirmPassword}
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#1c2759",
                textTransform: "none",
                fontSize: "14px",
                borderRadius: "10px",
                px: "1rem",
                mt: "1rem",
              }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Box>
    </UserSidebar>
  );
};

export default ChangePassword;
