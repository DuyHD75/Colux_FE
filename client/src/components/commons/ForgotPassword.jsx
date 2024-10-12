import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const ForgotPassword = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isForgotPasswordRequest, setIsForgotPasswordRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const forgotPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsForgotPasswordRequest(true);
      console.log(values);
      
      const { response, err } = await userApi.forgotPassword(values.email);
      setIsForgotPasswordRequest(false);
      console.log(response);
      
      if (response && response.code === 200) {
        forgotPasswordForm.resetForm();
        dispatch(setUser(response));
        toast.success("Please check your email to reset password!");
      } else {
        setErrorMessage(err.message);
        toast.error(response.exception)
      }
    },
  });

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Forgot password
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={forgotPasswordForm.handleSubmit}
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
              placeholder="Your email"
              onChange={forgotPasswordForm.handleChange}
              onBlur={forgotPasswordForm.handleBlur}
              value={forgotPasswordForm.values.username}
            />
            {forgotPasswordForm.errors.username &&
              forgotPasswordForm.touched.username && (
                <p className="text-red-600 text-sm mt-1">
                  {forgotPasswordForm.errors.username}
                </p>
              )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            loading={isForgotPasswordRequest}
          >
            Send
          </button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <div>
            <Link
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => switchAuthState("login")}
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
