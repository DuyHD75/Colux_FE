import React, { useEffect, useState } from "react";
import { Alert, Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import textConfigs from "../config/text.config";
import { CiEdit } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import userApi from "../api/modules/admin.api";
import { toast } from "react-toastify";
import uploadImageApi from "../api/modules/upload.api";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import { setAdmin } from "../redux/reducer/adminSlice";

const Profile = () => {
  const [editInfo, setEditInfo] = useState(false);
  const employee = JSON.parse(localStorage.getItem("employee"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [employeeState, setEmployeeState] = useState(employee && employee);
  const [adminState, setAdminState] = useState(admin && admin);
  const [userImage, setUserImage] = useState(
    employeeState?.user.imageUrl || adminState?.user.imageUrl || "/path-to-avatar.jpg"
  );


  const dispatch = useDispatch();

  console.log(adminState);
  

  const handleImageChange = async (event) => {
    const file = event.target.files[0]; // Lấy file từ input
    if (file) {
      try {
        // Tạo FormData để gửi file lên server
        const image = new FormData();
        image.append("file", file);
        image.append("folder", "shippings");

        // Gọi API để upload ảnh
        const uploadResponse = await uploadImageApi.uploadImage(image);

        if (uploadResponse && uploadResponse.data) {
          console.log("Upload response:", uploadResponse);
          // Cập nhật URL ảnh mới
          if (employeeState) {
            employeeState.user.imageUrl = uploadResponse.data.fileUrls[0];
            localStorage.setItem("employee", JSON.stringify(employeeState));
          }
          if (adminState) {
            adminState.user.imageUrl = uploadResponse.data.fileUrls[0];
            localStorage.setItem("admin", JSON.stringify(adminState));
          }

          // Chuẩn bị dữ liệu để cập nhật profile
          const profile = {
            imageUrl: uploadResponse.data.fileUrls[0], // Lấy URL từ phản hồi
          };
          dispatch(setAdmin(true));
          setUserImage(uploadResponse.data.fileUrls[0]);
          // Gọi API để cập nhật profile
          const { response, err } = await userApi.updateProfile(profile);

          if (response) {
            console.log(response);

            toast.success("Updated image successfully"); // Thông báo thành công
          } else {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile");
          }
        } else {
          alert("Error while uploading the image");
        }
      } catch (error) {
        console.error("Error during upload or update:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const updateProfile = async (values) => {
    const profile = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    };
    if (employeeState) {
      employeeState.user.firstName = values.firstName;
      employeeState.user.lastName = values.lastName;
      employeeState.user.phone = values.phone;
      setEmployeeState((prev) => ({...prev, firstName:  values.firstName, lastName: values.lastName, phone: values.phone}));
      localStorage.setItem("employee", JSON.stringify(employeeState));
    }
    if (adminState) {
      adminState.user.firstName = values.firstName;
      adminState.user.lastName = values.lastName;
      adminState.user.phone = values.phone;
      setAdminState((prev) => ({...prev, firstName:  values.firstName, lastName: values.lastName, phone: values.phone}))
      localStorage.setItem("admin", JSON.stringify(adminState));
    }
    dispatch(setAdmin(true));
    const { response, err } = await userApi.updateProfile(profile);
    if (response) {
      toast.success("Update profile successfully");
    }
  };

  const formikInfo = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(/^0\d{9}$/, "Phone number is not valid")
        .required("Phone number is required!"),
    }),
    onSubmit: (values) => {
      updateProfile(values);
      setEditInfo(false);
    },
  });

  useEffect(() => {
    const { firstName, lastName, email, phone } = employeeState?.user || adminState?.user || {};
    if (
      formikInfo.values.firstName !== firstName ||
      formikInfo.values.lastName !== lastName ||
      formikInfo.values.email !== email ||
      formikInfo.values.phone !== phone
    ) {
      formikInfo.setValues({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",
      });
    }
  }, []);

  const [errorMessage, setErrorMessage] = useState();

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
      setErrorMessage(undefined);
      const { response, err } = await userApi.changePassword(values);

      if (response) {
        formikPassword.resetForm();
        setErrorMessage(null);
        toast.success(response.message);
      } else {
        setErrorMessage(err.exception);
        console.log(err.exception);
        toast.error(err.exception);
      }
    },
  });

  return (
    <>
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        height: "auto",
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
        Profile
      </Typography>
      <Box
        sx={{
          borderRadius: "8px",
          padding: "12px",
          border: "1px solid #E5E5E5",
          mb: "1rem",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <div style={{ textAlign: "center" }}>
              <label htmlFor="avatar-upload">
                <Avatar
                  alt="User Avatar"
                  src={userImage || "https://via.placeholder.com/60"}
                  sx={{
                    width: 60,
                    height: 60,
                    cursor: "pointer",
                  }}
                />
              </label>

              <input
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <Box>
              <Typography
                sx={{
                  ...textConfigs.style.headerText,
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {employeeState && employeeState.user.firstName} {employeeState && employeeState.user.lastName}
                {adminState && adminState.user.firstName} {adminState && adminState.user.lastName}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          borderRadius: "10px",
          padding: "12px",
          border: "1px solid #E5E5E5",
          mb: "1rem",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              ...textConfigs.style.headerText,
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Personal Information
          </Typography>
          <Button
            size="small"
            onClick={() => setEditInfo(true)}
            endIcon={<CiEdit />}
            variant="outline"
            sx={{
              border: "1px solid grey",
              bgcolor: "transparent",
              textTransform: "none",
              fontSize: "14px",
              borderRadius: "10px",
              px: "1rem",
            }}
          >
            Edit
          </Button>
        </Stack>
        <form onSubmit={formikInfo.handleSubmit}>
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
                First Name
              </Typography>

              <input
                name="firstName"
                onChange={formikInfo.handleChange}
                onBlur={formikInfo.handleBlur}
                value={formikInfo.values.firstName}
                type="text"
                placeholder="First Name"
                disabled={!editInfo}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: `${editInfo ? "1px solid #E5E5E5" : "none"}`,
                }}
              />

              {formikInfo.touched.firstName && formikInfo.errors.firstName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikInfo.errors.firstName}
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
                Last Name
              </Typography>
              <input
                name="lastName"
                onChange={formikInfo.handleChange}
                onBlur={formikInfo.handleBlur}
                value={formikInfo.values.lastName}
                type="text"
                placeholder="Last Name"
                disabled={!editInfo}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: `${editInfo ? "1px solid #E5E5E5" : "none"}`,
                }}
              />
              {formikInfo.touched.lastName && formikInfo.errors.lastName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikInfo.errors.lastName}
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
                Email address
              </Typography>
              <input
                name="email"
                onChange={formikInfo.handleChange}
                onBlur={formikInfo.handleBlur}
                value={formikInfo.values.email}
                type="text"
                placeholder="Mail"
                disabled
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: `${editInfo ? "1px solid #E5E5E5" : "none"}`,
                }}
              />
              {formikInfo.touched.email && formikInfo.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikInfo.errors.email}
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
                Phone
              </Typography>
              <input
                name="phone"
                onChange={formikInfo.handleChange}
                onBlur={formikInfo.handleBlur}
                value={formikInfo.values.phone}
                type="text"
                placeholder="Phone"
                disabled={!editInfo}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: `${editInfo ? "1px solid #E5E5E5" : "none"}`,
                }}
              />
              {formikInfo.touched.phone && formikInfo.errors.phone ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikInfo.errors.phone}
                </div>
              ) : null}
            </Grid>
          </Grid>

          {editInfo && (
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
          )}
        </form>
      </Box>
    </Box>
    <Box
    sx={{
      width: { xs: "100%", md: "100%" },
      height: "auto",
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
        {errorMessage && <Alert sx={{ marginTop: 1 }} severity="error">{errorMessage}</Alert>}
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
  </>
  );
};

export default Profile;
