import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import textConfigs from "../config/text.config";
import { useTranslation } from "react-i18next";


const PrivacyPolicy = () => {
const { t } = useTranslation();
  return (
    <Box
      p={{ xs: "56px 10px 16px 10px", md: "152px 375.5px 16px 375.5px" }}
      bgcolor="#0000"
      minHeight="inherit"
    >
      <div className="fixed bottom-4 right-4">
        <a
          href="#section"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 15l-7-7-7 7"
            />
          </svg>
        </a>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mb: "2rem",
        }}
      >
        <Typography
          id="section"
          sx={{
            scrollMarginTop: "96px",
            ...textConfigs.style.headerText,
            fontWeight: "bold",
            textAlign: "center",
          }}
          variant="h2"
        >
          {t('privacy.policy')}
        </Typography>
        <Typography
          sx={{
            ...textConfigs.style.basicFont,
            fontWeight: "400",
            fontSize: "16px",
            mt: "5px",
            textAlign: "center",
          }}
        >
          {t('privacy.policy.date')}
        </Typography>
      </Box>

      <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={4}>
        <Box width={{ xs: "100%", sm: "75%" }}>
          <Typography
            id="section1"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
            }}
          >
            {t("privacy.policy.section1.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section1.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section1.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section1.content.alf3")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section1.content.alf4")}
          </Typography>
          <Divider />
          <Typography
            id="section2"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
            {t("privacy.policy.section2.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section2.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section2.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section2.content.alf3")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section2.content.alf4")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section2.content.alf5")}
          </Typography>
          <Divider />
          <Typography
            id="section3"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
            {t("privacy.policy.section3.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section3.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section3.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section3.content.alf3")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
              ml: "1rem",
            }}
          >
            {t("privacy.policy.section3.content.alf4")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
              ml: "1rem",
            }}
          >
            {t("privacy.policy.section3.content.alf5")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
              ml: "1rem",
            }}
          >
            {t("privacy.policy.section3.content.alf6")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
              ml: "1rem",
            }}
          >
            {t("privacy.policy.section3.content.alf7")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section3.content.alf8")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section3.content.alf9")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section3.content.alf10")}
          </Typography>
          <Divider />
          <Typography
            id="section4"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
            {t("privacy.policy.section4.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section4.content.alf1")}
          </Typography>
          <Divider />
          <Typography
            id="section5"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
            {t("privacy.policy.section5.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section5.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section5.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section5.content.alf3")}
            <a href={t("privacy.policy.section5.content.alf3.link")}>
                {t("privacy.policy.section5.content.alf3.link")}
            </a>{" "}
            {t("privacy.policy.section5.content.alf3.successive")}
          </Typography>
          <Divider />
          <Typography
            id="section6"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
            {t("privacy.policy.section5.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf3")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf4")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf5")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf6")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf7")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf8")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf9")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section6.content.alf10")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section6.content.alf11")}
          </Typography>
          <Divider />
          <Typography
            id="section7"
            sx={{
              scrollMarginTop: "96px",
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "36px",
              mb: "1.5rem",
              mt: "1.5rem",
            }}
          >
           {t("privacy.policy.section7.title")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section7.content.alf1")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section7.content.alf2")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section7.content.alf3")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "0.5rem",
            }}
          >
            {t("privacy.policy.section7.content.alf4")}
          </Typography>
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "400",
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            {t("privacy.policy.section7.content.alf5")}
          </Typography>
        </Box>
        <Box
          width={{ xs: "100%", sm: "25%" }}
          sx={{
            position: { xs: "normal", sm: "sticky" },
            top: "96px",
            alignSelf: "flex-start",
            maxWidth: "300px",
          }}
        >
          <Typography
            sx={{
              ...textConfigs.style.basicFont,
              fontWeight: "bold",
              fontSize: "20px",
              mb: "0.5rem",
            }}
          >
            {" "}
            {t("privacy.policy.menu")}
          </Typography>
          <Box sx={{ paddingLeft: "10px", paddingBottom: "1rem" }}>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              1.{" "}
              <a href="#section1" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section1.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              2.{" "}
              <a href="#section2" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section2.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              3.{" "}
              <a href="#section3" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section3.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              4.{" "}
              <a href="#section4" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section4.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              5.{" "}
              <a href="#section5" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section5.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              6.{" "}
              <a href="#section6" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section6.title")}
              </a>
            </Typography>
            <Typography
              sx={{
                ...textConfigs.style.basicFont,
                fontWeight: "400",
                fontSize: "18px",
              }}
            >
              7.{" "}
              <a href="#section7" style={{ textDecoration: "underline" }}>
                {" "}
                {t("privacy.policy.section7.title")}
              </a>
            </Typography>
          </Box>
          <Divider />
        </Box>
      </Stack>
    </Box>
  );
};

export default PrivacyPolicy;
