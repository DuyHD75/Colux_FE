import React, { useEffect, useState } from "react";
import UserSidebar from "../components/commons/UserSidebar";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import textConfigs from "../config/text.config";
import { user } from "../data/Product";
import { CiEdit } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import uploadImageApi from "../api/modules/upload.api";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";

const Profile = () => {
  const [editInfo, setEditInfo] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [userState, setUserState] = useState(user && user);
  const [userImage, setUserImage] = useState(userState?.imageUrl);


  const dispatch = useDispatch();

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
          user.imageUrl = uploadResponse.data.fileUrls[0];
          localStorage.setItem("user", JSON.stringify(user));
          // Chuẩn bị dữ liệu để cập nhật profile
          const profile = {
            imageUrl: uploadResponse.data.fileUrls[0], // Lấy URL từ phản hồi
          };
          dispatch(setGlobalLoading(true));
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
    const { response, err } = await userApi.updateProfile(profile);
    if (response) {
      user.firstName = values.firstName;
      user.lastName = values.lastName;
      user.phone = values.phone;
      localStorage.setItem("user", JSON.stringify(user));    
      setUserState((prev) => ({...prev, firstName:  values.firstName, lastName: values.lastName, phone: values.phone}));
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

  const formikAddress = useFormik({
    initialValues: {
      country: "United Kingdom",
      city: "Leeds, East London",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setEditAddress(false);
    },
  });

  useEffect(() => {
    const { firstName, lastName, email, phone } = userState;
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
                  {userState && userState.firstName} {userState && userState.lastName}
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
        {/* <Box sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid #E5E5E5',
                    mb: '1rem'
                }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='space-between'>
                        <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '16px' }}>Address</Typography>
                        <Button size='small' onClick={() => setEditAddress(true)} endIcon={<CiEdit />} variant="outline" sx={{ border: '1px solid grey', bgcolor: 'transparent', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem' }}>Edit</Button>
                    </Stack>
                    <form onSubmit={formikAddress.handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Country</Typography>
                                <input
                                    name="country"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.country}
                                    type="text" placeholder="Country" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.country && formikAddress.errors.country ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.country}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>City/State</Typography>
                                <input
                                    name="city"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.city}
                                    type="text" placeholder="City" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.city && formikAddress.errors.city ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.city}</div>
                                ) : null}
                            </Grid>
                           

                        </Grid>
                        {editAddress && <Button type='submit' size='small' variant="contained" sx={{ bgcolor: '#1c2759', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem', mt: '1rem' }}>Save</Button>}
                    </form>
                </Box> */}
      </Box>
    </UserSidebar>
  );
};

export default Profile;
