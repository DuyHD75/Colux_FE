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

const ResetPassword = ({ switchAuthState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isResetPasswordRequest, setIsResetPasswordRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
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
        navigate('/login')
      }
      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Reset password
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={resetPasswordForm.handleSubmit}
        >
          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.password}
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                {showPassword ? (
                  <Visibility className="text-gray-900 dark:text-white" />
                ) : (
                  <VisibilityOff className="text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
            {resetPasswordForm.errors.password &&
              resetPasswordForm.touched.password && (
                <p className="text-red-600 text-sm mt-1">
                  {resetPasswordForm.errors.password}
                </p>
              )}
          </div>

          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.confirmPassword}
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                {showPassword ? (
                  <Visibility className="text-gray-900 dark:text-white" />
                ) : (
                  <VisibilityOff className="text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
            {resetPasswordForm.errors.confirmPassword &&
              resetPasswordForm.touched.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {resetPasswordForm.errors.confirmPassword}
                </p>
              )}
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                aria-describedby="newsletter"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label
                for="newsletter"
                class="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            loading={isResetPasswordRequest}
          >
            Reset
          </button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
