import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { LoadingButton } from '@mui/lab';

const Register = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const registerForm = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string().required("LastName is required!"),
      firstName: Yup.string().required("FirstName name is required!"),
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
        .required("Confirm Password is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsRegisterRequest(true);
      const { response, err } = await userApi.register(values);
      setIsRegisterRequest(false);
      console.log(response);
      
      if (response) {
        registerForm.resetForm();
        toast.success(response.message);
      }
      
      if (err) { 
        setErrorMessage(err.exception);
        toast.error(err.exception)
      }
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={registerForm.handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.email}
            />
            {registerForm.errors.email && registerForm.touched.email && (
              <p className="text-red-600 text-sm mt-1">
                {registerForm.errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="First Name"
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                value={registerForm.values.firstName}
              />
              {registerForm.errors.firstName &&
                registerForm.touched.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.errors.firstName}
                  </p>
                )}
            </div>

            <div className="w-full">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last Name"
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                value={registerForm.values.lastName}
              />
              {registerForm.errors.lastName &&
                registerForm.touched.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.errors.lastName}
                  </p>
                )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.password}
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
              {registerForm.errors.password &&
                registerForm.touched.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.errors.password}
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
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  value={registerForm.values.confirmPassword}
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
              {registerForm.errors.confirmPassword &&
                registerForm.touched.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>

          <LoadingButton
            type="submit"
            loading={isRegisterRequest}
            variant="contained"
            sx={{
              width: "100%",
              color: "white",
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              fontWeight: "500",
              fontSize: "0.875rem",
              padding: "10px 20px",
              textAlign: "center",
              borderRadius: "8px",
              ":focus": {
                outline: "none",
                boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.4)", // focus ring
              },
              darkMode: {
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "&:focus": {
                  boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.6)",
                },
              },
            }}
          >
            Create an account
          </LoadingButton>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => switchAuthState("login")}
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
