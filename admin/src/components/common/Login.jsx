import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/modules/admin.api";
import { setAdmin } from "../../redux/reducer/adminSlice";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import routesGen from "../../router/router";

const Login = () => {
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
      dispatch(setGlobalLoading(true));

      const { response, err } = await adminApi.login(values);

      setIsLoginRequest(false);
      dispatch(setGlobalLoading(false));
      console.log(response);
      if (
        response &&
        (response.data.user.role === "EMPLOYEE" ||
          response.data.user.role === "ADMIN")
      ) {
        loginForm.resetForm();
        localStorage.setItem("admin", JSON.stringify(response.data));
        dispatch(setAdmin(response.data));
        navigate("/dashboard");
      } else {
        setErrorMessage("Your account does not have permission to access this page.");
      }
      if(err) {
        setErrorMessage(err.exception);
      }
    },
  });

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow dark:border-gray-700 sm:max-w-lg xl:p-0">
      <div className="p-6 space-y-4 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Admin Login
        </h1>
        <form className="space-y-4" onSubmit={loginForm.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
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
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
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
                  <Visibility className="text-white" />
                ) : (
                  <VisibilityOff className="text-white" />
                )}
              </button>
            </div>
            {loginForm.errors.password && loginForm.touched.password && (
              <p className="text-red-600 text-sm mt-1">
                {loginForm.errors.password}
              </p>
            )}
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
            }}
          >
            Login
          </LoadingButton>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default Login;
