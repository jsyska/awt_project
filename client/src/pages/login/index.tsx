import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux";
import FormInput from "../../components/formInput";
import _appsettings from "../../../appSettings.json";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const serverUrl =
    _appsettings.CONFIG.ENVIRONMENT === "development"
      ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
      : "";

  const initialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: LoginFormData) => {
    const loggedInResponse = await fetch(
      `${serverUrl}/auth/login`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();

    values.password = "";
    if (loggedIn.user) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex h-screen justify-evenly bg-slate-800 md:bg-[#020917]">
      <img
        src="https://cdn.svgator.com/images/2021/10/solar-system-animation.svg"
        alt="space"
        className="hidden h-screen w-2/5 md:block"
      />
      <div className=" flex h-screen w-full items-center justify-center overflow-auto md:w-2/5">
        <div className="flex w-full bg-slate-400 p-7 dark:bg-slate-800 md:rounded-lg">
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
                <FormInput
                  title="email"
                  type="email"
                  placeholder="E.g. johndoe@example.com"
                  fullWidth={true}
                />
                <FormInput
                  title="password"
                  type="password"
                  placeholder="Password"
                  fullWidth={true}
                />

                {/* Submit */}
                {err && (
                  <p className="-mb-4 text-center text-red-600">
                    Invalid email or password.
                  </p>
                )}
                <button
                  type="submit"
                  className="mx-auto mt-3 w-2/3 rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-500"
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
