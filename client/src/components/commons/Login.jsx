import React, { useEffect, useState } from "react";
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
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const actionState = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
};

const Login = ({ switchAuthState }) => {

  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters!")
        .required("Password is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.login(values);
      setIsLoginRequest(false);
      
      if (response.status === "OK" && response.code === 200) {
        dispatch(setUser(response.data.user));
        loginForm.resetForm();
        toast.success("Login Successfully!");
        navigate("/");
      } else {
        setErrorMessage(err.exception);
        toast.error(err.exception)
      }
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 flex justify-start">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login with
            </h1>
          </div>
          <div className="col-span-8 flex justify-center items-center gap-6">
            <Link to="/login-facebook" className="flex items-center">
              <FaFacebook
                color="#4267b2"
                size={32}
                className="bg-white rounded-full"
              />
            </Link>
            <Link to="/login-google" className="flex items-center">
              <FcGoogle size={32} className="bg-white rounded-full" />
            </Link>
          </div>
        </div>

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Or login to your account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={loginForm.handleSubmit}
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
              placeholder="Your Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <p className="text-red-600 text-sm mt-1">
                {loginForm.errors.email}
              </p>
            )}
          </div>
          <div>
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
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
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
            {loginForm.errors.password && loginForm.touched.password && (
              <p className="text-red-600 text-sm mt-1">
                {loginForm.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => switchAuthState(actionState.forgotPassword)}
            >
              Forgot password?
            </Link>
          </div>
          <LoadingButton
            type="submit"
            loading={isLoginRequest}
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
            Login
          </LoadingButton>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => switchAuthState(actionState.register)}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
