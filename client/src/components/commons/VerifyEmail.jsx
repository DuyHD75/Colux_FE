import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [fade, setFade] = useState(0);
  const [redirectMessage, setRedirectMessage] = useState("");

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      if (param.key) {
        setFade(0);
        try {
          let response;
          if (param.user === "account") {
            ({ response } = await userApi.verifyAccount(param.key));
          } else if (param.user === "reset") {
            ({ response } = await userApi.verifyResetPassword(param.key));
          }
          if (response && response.code === 200) {
            setLoading(false);
            setSuccess(true);
            setShowIcon(true);
            setFade(1);
            toast.success(response.message);
            setRedirectMessage("Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
          } else {
            setLoading(false);
            setSuccess(false);
            setShowIcon(true);
            setFade(1);
            console.log(response.message);
            toast.error(response.message);
            setRedirectMessage("Redirecting to reset password...");
            setTimeout(() => navigate("/resetPassword"), 2000);
          }
        } catch (error) {
          setLoading(false);
          setSuccess(false);
          setShowIcon(true);
          console.log("Error", error);
          toast.error(error);
        }
      }
    };
    verifyAccount();
  }, [param, navigate]);

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
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VerifyEmail;
