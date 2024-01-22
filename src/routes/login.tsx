import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  };

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        setRedirect("/");
      },
      (error: AxiosError) => {
        const resMessage = (error.response && error.response.data) as string;

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      setRedirect("/");
    }

    if (redirect) {
      navigate("/");
    }
  }, [navigate, redirect]);

  const initialValues = { username: "", password: "" };

  return (
    <div id="login-container" className="w-full flex justify-center py-4">
      <div
        id="card-container"
        className="dark:bg-dark-grey bg-white rounded-3xl flex flex-col justify-center py-6 px-4 items-center h-modal overflow-auto w-[480px] shadow-[0px_10px_15px_5px_rgba(54,78,126,0.1)]"
      >
        <div
          id="login-info"
          className="flex flex-col justify-around w-full pb-3 pt-4"
        >
          <p className="text-heading-l dark:text-white break-words mx-4">
            Login to your account to use the app.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form
            id="form"
            className="flex flex-col pt-1 w-full px-4 justify-around"
          >
            <div
              id="form-username"
              className="text-body-xl text-medium-grey pb-2 dark:text-white flex flex-col"
            >
              <label htmlFor="username">Username</label>
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
              id="form-password"
              className="text-body-xl text-medium-grey pb-2 dark:text-white flex flex-col"
            >
              <label htmlFor="password">Password</label>
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
              id="auth-btn"
              className="flex w-full justify-center py-2 flex-col items-center"
            >
              <button
                type="submit"
                className="btn-primary-s"
                disabled={loading}
              >
                {" "}
                {loading ? <BeatLoader color="#635FC7" /> : <span>Login</span>}
              </button>
            </div>
            <div
              id="sign-up-section"
              className="flex flex-col items-center pt-3"
            >
              <p className="text-heading-m font-thin text-medium-grey break-words w-44 text-center">
                Don't have an account? Sign up to get started.
              </p>
              <button className="btn-primary-s mt-4" disabled={loading}>
                {loading ? (
                  <BeatLoader color="#635FC7" />
                ) : (
                  <NavLink className="ring-0 outline-0" to={"/register"}>
                    Signup
                  </NavLink>
                )}
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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

export default Login;
