import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import AuthService from "../services/auth.service";
import { AxiosError, AxiosResponse } from "axios";
import { Link, NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);

    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response: AxiosResponse<{ message: string }>) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error: AxiosError) => {
        const resMessage = (error.response && error.response.data) as string;

        setLoading(false);
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
    <div
      id="register-container"
      className="w-full flex justify-center py-4 phone:mx-4"
    >
      <div
        id="card-container"
        className="dark:bg-dark-grey bg-white rounded-3xl flex flex-col py-6 px-4 h-modal overflow-auto tablet:w-[480px] phone:w-full shadow-[0px_10px_15px_5px_rgba(54,78,126,0.1)]"
      >
        <div id="register-info" className="flex flex-col w-full pb-3 pt-4">
          <p className="text-heading-l dark:text-white break-words mx-4">
            Register as a new user.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form
            id="form"
            className="flex flex-col pt-1 w-full px-4 justify-around"
          >
            {!successful && (
              <div>
                <div
                  id="form-username"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white flex flex-col"
                >
                  <label htmlFor="username"> Username </label>
                  <Field
                    name="username"
                    type="text"
                    className={`focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md dark:bg-dark-grey`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="bg-red-hover/75 text-heading-m font-medium text-black/75 rounded-lg mt-1 py-4 px-4"
                  />
                </div>

                <div
                  id="form-email"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white flex flex-col"
                >
                  <label htmlFor="email">Email </label>
                  <Field
                    name="email"
                    type="email"
                    className={`focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md dark:bg-dark-grey`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="bg-red-hover/75 text-heading-m font-medium text-black/75 rounded-lg mt-1 py-4 px-4"
                  />
                </div>

                <div
                  id="form-password"
                  className="text-body-xl text-medium-grey pb-2 dark:text-white flex flex-col"
                >
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className={`focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md dark:bg-dark-grey`}
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
                    className="btn-primary-s"
                    disabled={loading}
                  >
                    {loading ? (
                      <BeatLoader color="#635FC7" />
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </button>
                </div>
                <div
                  id="login-section"
                  className="flex flex-col items-center pt-3"
                >
                  <p className="text-heading-m font-thin text-medium-grey break-words w-48 text-center">
                    Already have an account? Sign in and get started.
                  </p>
                  <button className="btn-primary-s mt-4" disabled={loading}>
                    {loading ? (
                      <BeatLoader color="#635FC7" />
                    ) : (
                      <NavLink to={"/login"}>Login</NavLink>
                    )}
                  </button>
                </div>
              </div>
            )}
            {message && (
              <div id="message" className="py-4">
                <div
                  className={
                    successful
                      ? "text-medium-grey text-body-m font-light dark:text-white"
                      : "text-destructive-red text-body-m font-light"
                  }
                  role="alert"
                >
                  {message}
                  {successful && <p>Now you can login to your account.</p>}
                </div>
                <div
                  id="login-btn-container"
                  className="flex items-center mt-2"
                >
                  <Link to="/login">
                    <button className="btn-primary-s">Login</button>
                  </Link>
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
