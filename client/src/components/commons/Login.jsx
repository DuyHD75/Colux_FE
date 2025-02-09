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
import { Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import textConfigs from "../../config/text.config";

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  }

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

      if (response && response.data.user.role === "USER") {
        dispatch(setUser(response.data.user));
        loginForm.resetForm();
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setErrorMessage(
          "Your account does not have permission to access this page."
        );
      }
      if(err) {
        setErrorMessage(err.exception);
      }
      // if (err && err.code === 401) {
      //   setErrorMessage("No access permission.");
      // }
      // if (err && (err.code === 400 || err.code === 404)) {
      //   setErrorMessage("Not found user");
      // }
      // if (err && err.code === 500) {
      //   setErrorMessage("Server error.");
      // }
    },
  });

  useEffect(() => {
    const loginWithGoogle = async () => {
      const { response, err } = await userApi.getInfo();
      if (response?.status === 500) {
        toast.error("Login with google failed!");
      } else if (response) {
        console.log("response", response);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login with google successfully!");
        navigate("/");
      }
    };
    if (status === "success") {
      loginWithGoogle();
    }else if (status === "failed") {
      toast.error("Login with google failed!");
    }

  }, []);

  console.log("status", status);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(undefined);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow dark:border-gray-700 sm:max-w-lg xl:p-0">
      {/* Nút Back Home */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>
      <div className="p-6 space-y-4 sm:p-8">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 flex justify-start">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl font-nunito">
              Login with
            </h1>
          </div>
          <div className="col-span-8 flex justify-center items-center gap-6">
            {/* <Link to="/login-facebook" className="flex items-center">
              <FaFacebook
                color="#4267b2"
                size={32}
                className="bg-white rounded-full"
              />
            </Link> */}
            <Link
              to="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://colux.site/identity-service/api/v1/users/public/grantcode&client_id=106159633603-urb1kt4jf1tualas0qq1gs5ju729nb1h.apps.googleusercontent.com"
              className="flex items-center"
            >
              <FcGoogle size={32} className="bg-white rounded-full" />
            </Link>
          </div>
        </div>

        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl font-nunito">
          Or login to your account
        </h1>
        <form className="space-y-4" onSubmit={loginForm.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white font-nunito"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 font-nunito"
              placeholder="Your Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <p className="text-red-600 text-sm mt-1 font-nunito">
                {loginForm.errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white font-nunito"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 font-nunito"
                placeholder="••••••••"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none font-nunito"
              >
                {showPassword ? (
                  <Visibility className="text-white" />
                ) : (
                  <VisibilityOff className="text-white" />
                )}
              </button>
            </div>
            {loginForm.errors.password && loginForm.touched.password && (
              <p className="text-red-600 text-sm mt-1 font-nunito">
                {loginForm.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="text-sm font-medium text-primary-500 hover:underline font-nunito"
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
                boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.4)",
              },
              ...textConfigs.style.basicFont,
            }}
          >
            Login
          </LoadingButton>
          {errorMessage && (
            <Alert sx={{ ...textConfigs.style.basicFont }} severity="error">
              {errorMessage}
            </Alert>
          )}
          <p className="text-sm font-light text-gray-400 font-nunito">
            Don’t have an account yet?{" "}
            <Link
              href="register"
              className="font-medium text-primary-500 hover:underline font-nunito"
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
