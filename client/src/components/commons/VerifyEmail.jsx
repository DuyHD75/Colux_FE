import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [fade, setFade] = useState(0);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy giá trị key từ query parameters
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get("key");
  const userType = location.pathname.split("/")[2]; // Lấy kiểu người dùng từ đường dẫn

  useEffect(() => {
    const verifyAccount = async () => {
      if (key) {
        setFade(0);
        try {
          let response, err;
          if (userType === "account") {
            ({ response, err } = await userApi.verifyAccount(key));
          } else if (userType === "reset") {
            ({ response, err } = await userApi.verifyResetPassword(key));
          }
          if (response && response.code === 200) {
            setSuccess(true);
            toast.success(response.message);
            if (userType === "account") {
              setRedirectMessage("Redirecting to login...");
              const timer = setTimeout(() => navigate("/login"), 2000);
              return () => clearTimeout(timer); 
            } else {
              setRedirectMessage("Redirecting to reset password...");
              const timer = setTimeout(() => navigate("/resetPassword"), 2000);
              return () => clearTimeout(timer); 
            }
          } else {
            setSuccess(false);
            toast.error(err.exception);
            setErrMessage(err.exception)
          }
        } catch (error) {
          console.log("Error", error);
          toast.error(error);
          setErrMessage(error)
        } finally {
          setLoading(false);
          setShowIcon(true);
          setFade(1);
        }
      }
    };
    verifyAccount();
  }, [key, userType, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {loading ? (
        <MoonLoader color="#1c2759" loading size={50} speedMultiplier={1} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          marginTop={2}
        >
          {showIcon && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                fontSize: "50px",
                opacity: fade,
                transition: "opacity 1s ease-in-out",
              }}
            >
              {success ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaTimesCircle color="red" />
              )}
            </Box>
          )}
          <Typography variant="h6" color={success ? "green" : "red"}>
            {success ? "Success!" : "Failed!"}
          </Typography>
          <Typography variant="body1" marginTop={2} color="#1c2759">
            {redirectMessage}
            {errMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VerifyEmail;
