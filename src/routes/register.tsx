import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import AuthService from "../services/auth.service";
import { AxiosError, AxiosResponse } from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: string | undefined) =>
            !!val && val.length >= 3 && val.length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: string | undefined) =>
            !!val && val.length >= 6 && val.length <= 40
        )
        .required("This field is required!"),
    });
  };

  const handleRegister = (formValue: {
    username: string;
    email: string;
    password: string;
  }) => {
    const { username, email, password } = formValue;

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response: AxiosResponse<{ message: string }>) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error: AxiosError) => {
        const resMessage = (error.response && error.response.data) as string;

        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <div id="register-container" className="w-full flex justify-center py-4">
      <div
        id="card-container"
        className="dark:bg-dark-grey bg-white rounded-3xl flex flex-col py-6 px-4 h-modal overflow-auto max-w-[480px]"
      >
        <div
          id="register-info"
          className="flex flex-col max-w-[300px] pb-3 pt-4"
        >
          <p className="text-heading-l dark:text-white break-words">
            Register as a new user.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form id="form" className="flex flex-col pt-1 w-fit justify-around">
            {!successful && (
              <div>
                <div
                  id="form-username"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white"
                >
                  <label htmlFor="username"> Username </label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full dark:bg-dark-grey dark:border-lines-dark border-lines-light"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="bg-red-hover/75 text-heading-m font-medium text-black/75 rounded-lg mt-1 py-4 px-4"
                  />
                </div>

                <div
                  id="form-email"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white"
                >
                  <label htmlFor="email">Email </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full dark:bg-dark-grey dark:border-lines-dark border-lines-light"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="bg-red-hover/75 text-heading-m font-medium text-black/75 rounded-lg mt-1 py-4 px-4"
                  />
                </div>

                <div
                  id="form-password"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white"
                >
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full dark:bg-dark-grey dark:border-lines-dark border-lines-light"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="bg-red-hover/75 text-heading-m font-medium text-black/75 rounded-lg mt-1 py-4 px-4"
                  />
                </div>

                <div
                  id="register-btn"
                  className="flex w-full justify-center items-center py-2"
                >
                  <button
                    type="submit"
                    className="bg-main-purple hover:bg-main-purple-hover text-[#FFFFFF] px-3 font-medium rounded-full flex items-center disabled:bg-main-purple-hover h-10"
                  >
                    Sign Up
                  </button>
                </div>
                <div
                  id="login-section"
                  className="flex flex-col items-center pt-3"
                >
                  <p className="text-heading-m font-thin text-medium-grey break-words w-48 text-center">
                    Already have an account? Sign in and get started.
                  </p>
                  <button className="dark:text-[#FFFFFF] dark:hover:text-main-purple-hover text-main-purple hover:text-main-purple-hover px-3 font-medium disabled:bg-main-purple-hover h-10 w-fit">
                    <NavLink to={"/login"}>Login</NavLink>
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div id="message" className="form-group">
                <div
                  className={
                    successful
                      ? "text-medium-grey text-body-m font-light dark:text-white"
                      : "text-destructive-red text-body-m font-light"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Register;
