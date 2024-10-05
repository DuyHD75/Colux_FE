import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [fade, setFade] = useState(0);

  const param = useParams();

  console.log(param.key);
  useEffect(() => {
    const verifyAccount = async () => {
      if (param.key) {
        setFade(0);
        try {
          console.log(param.key);
          let response, err;
          if (param.user === "account") {
            ({ response, err } = await userApi.verifyAccount(param.key));
          } else if (param.user === "reset") {
            ({ response, err } = await userApi.verifyResetPassword(param.key));
          }
          if (response && response.code === 200) {
            setLoading(false);
            setSuccess(true);
            setShowIcon(true);
            setFade(1);
            toast.success(response.message);
          } else if (err) {
            setLoading(false);
            setSuccess(false);
            setShowIcon(true);
            setFade(1);
            console.log(err.exception);
            toast.error(err.exception);
          } else {
            setLoading(false);
            setSuccess(false);
            setShowIcon(true);
            setFade(1);
            console.log(response.message);
            toast.error(response.message);
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
  }, [param]);

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
          {success ? (
          <Box marginTop={2}>
            {param.user === "account" ? (<Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1c2759",
                fontSize: "18px",
              }}
            >
              Go to login
            </Link>) : (<Link
              to="/resetPassword"
              style={{
                textDecoration: "none",
                color: "#1c2759",
                fontSize: "18px",
              }}
            >
              Go to Reset Password
            </Link>)}
          </Box>
          ) : ""}
        </Box>
      )}
    </Box>
  );
};

export default VerifyEmail;
