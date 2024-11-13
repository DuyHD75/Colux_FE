import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { Link, useLocation, useNavigate } from "react-router-dom";
import textConfigs from "../config/text.config";
import { Button } from "antd";
import backgroundConfigs from "../config/background.config";

const ResultPayment = () => {
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [fade, setFade] = useState(1);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy giá trị key từ query parameters
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const [success, setSuccess] = useState(status === "success" ? true : false);

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
          marginTop={2}
          padding={2}
          boxShadow='0 0 10px rgba(0, 0, 0, 0.1)'
          width='300px'
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
          <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold ' }} variant="h6" color={success ? "green" : "red"}>
            {success ? "Payment Success!" : "Payment Failed!"}
          </Typography>
          <Typography sx={{ ...textConfigs.style.basicFont, mb: '5px' }} variant="body1" marginTop={2} color={success ? "green" : "red"}>
            {success ? "Thank you for your payment!" : "Please try again!"}
          </Typography>
          <Link to='/orderHistory'>
            <button style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...textConfigs.style.basicFont, marginTop: '15px' }} className='min-w-fit py-2 px-3 flex justify-center'>Continue to Shopping</button>
          </Link>
          <Typography sx={{ ...textConfigs.style.basicFont }} variant="body1" marginTop={2} color="#1c2759">
            {redirectMessage}
            {errMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResultPayment;
