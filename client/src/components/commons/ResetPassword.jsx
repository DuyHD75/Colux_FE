import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import textConfigs from "../../config/text.config";

const ResetPassword = ({ switchAuthState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isResetPasswordRequest, setIsResetPasswordRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const resetPasswordForm = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match!")
        .required("Confirm Password is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsResetPasswordRequest(true);
      const { response, err } = await userApi.resetPassword(values);
      setIsResetPasswordRequest(false);

      if (response) {
        resetPasswordForm.resetForm();
        dispatch(setUser(response));
        toast.success(response.message);
        navigate("/login");
      } else {
        setErrorMessage(err.message);
      }
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-nunito">
          Reset password
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={resetPasswordForm.handleSubmit}
        >
          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-nunito"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-nunito"
                placeholder="••••••••"
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.newPassword}
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none font-nunito"
              >
                {showPassword ? (
                  <Visibility className="text-gray-900 dark:text-white" />
                ) : (
                  <VisibilityOff className="text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
            {resetPasswordForm.errors.newPassword &&
              resetPasswordForm.touched.newPassword && (
                <p className="text-red-600 text-sm mt-1 font-nunito">
                  {resetPasswordForm.errors.newPassword}
                </p>
              )}
          </div>

          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-nunito"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-nunito"
                placeholder="••••••••"
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.confirmPassword}
              />
              <button
                type="button"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none font-nunito"
              >
                {showConfirmPassword ? (
                  <Visibility className="text-gray-900 dark:text-white" />
                ) : (
                  <VisibilityOff className="text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
            {resetPasswordForm.errors.confirmPassword &&
              resetPasswordForm.touched.confirmPassword && (
                <p className="text-red-600 text-sm mt-1 font-nunito">
                  {resetPasswordForm.errors.confirmPassword}
                </p>
              )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="newsletter"
                aria-describedby="newsletter"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="newsletter"
                className="font-light text-gray-500 dark:text-gray-300 font-nunito"
              >
                I accept the{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 font-nunito"
                  to="/terms_and_condition"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
          <LoadingButton
            type="submit"
            loading={isResetPasswordRequest}
            variant="contained"
            sx={{
              width: "100%",
              color: "white",
              backgroundColor: "primary.600",
              "&:hover": {
                backgroundColor: "primary.700",
              },
              "&.Mui-focusVisible": {
                outline: "none",
                boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.1)",
              },
              fontWeight: "medium",
              borderRadius: "8px",
              fontSize: "0.875rem",
              padding: "10px 20px",
              textAlign: "center",
              ...textConfigs.style.basicFont
            }}
          >
            Reset
          </LoadingButton>
          {errorMessage && <Alert sx={{...textConfigs.style.basicFont}}  severity="error">{errorMessage}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
