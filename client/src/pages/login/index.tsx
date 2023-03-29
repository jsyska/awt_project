import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginFormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    const loggedInResponse = await fetch(
      "/auth/login",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );

      navigate("/");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-slate-400 py-4 px-8 dark:bg-slate-800">
        <div className="flex items-center justify-between gap-3">
          <span className="text-3xl font-bold text-slate-200">
            NETIZEN SPACE
          </span>
        </div>
      </div>
      <div className=" flex h-screen w-full items-center justify-center overflow-auto">
        <div className="flex w-full bg-slate-400 p-7 dark:bg-slate-800 sm:w-4/5 md:w-3/5 md:rounded-lg xl:w-2/5">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Form className="flex w-full flex-col gap-5 p-5">
                <h1 className="mx-auto text-2xl font-bold">
                  Welcome to Netizen Space 🚀
                </h1>
                <div className="text-center text-sm text-slate-700 dark:text-slate-500">
                  <p className="">
                    Please log in using your email and password.
                  </p>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="text-xl font-bold">
                      Email
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-xs"
                    />
                  </div>
                  <Field
                    name="email"
                    type="text"
                    className="rounded-md p-3 text-xl text-slate-900 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                {/* Password */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xl font-bold">
                      Password
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-xs"
                    />
                  </div>
                  <Field
                    name="password"
                    type="password"
                    className="rounded-md p-3 text-xl text-slate-900 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mx-auto mt-3 w-2/3 rounded-lg bg-indigo-500 py-3 text-white"
                >
                  SIGN IN
                </button>
                <p className="mx-auto text-xs">
                  Don't have an account?{" "}
                  <Link to="/register">
                    <u>Register.</u>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
