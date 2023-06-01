import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../../components/formInput";
import { countryList } from "../../assets/countries";
import Dropzone from "react-dropzone";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import _appsettings from "../../../appSettings.json";

interface RegistrationFormData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  picture: File | null;
  occupation: string;
  country: string;
  acceptTerms: boolean;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const serverUrl =
    _appsettings.CONFIG.ENVIRONMENT === "development"
      ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
      : "";

  const initialValues: RegistrationFormData = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: "",
    picture: null,
    occupation: "",
    country: "Afghanistan",
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("*Invalid email address").required("*Required"),
    username: Yup.string().required("*Required").min(3, "*Min 3 characters"),
    firstName: Yup.string()
      .min(3, "*Min 3 characters")
      .max(15, "*Max 15 characters")
      .required("*Required"),
    lastName: Yup.string()
      .min(3, "*Min 3 characters")
      .max(15, "*Max 15 characters")
      .required("*Required"),
    password: Yup.string().min(6, "*Min 6 characters").required("*Required"),
    confirm: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "*Passwords must match"
    ),
    acceptTerms: Yup.boolean().oneOf([true], "*Required"),
  });

  const onSubmit = async (
    values: RegistrationFormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("username", values.username);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("occupation", values.occupation);
    formData.append("country", values.country);
    values.picture && formData.append("picture", values.picture);

    const savedUserResponse = await fetch(`${serverUrl}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const savedUser = await savedUserResponse.json();
    resetForm();

    if (savedUser) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-evenly overflow-auto bg-slate-800 md:bg-[#020917]">
      <img
        src="https://cdn.svgator.com/images/2021/10/solar-system-animation.svg"
        alt="space"
        className="hidden h-screen w-2/5 md:block"
      />
      <div className="flex items-center justify-center md:w-2/5">
        <div className="flex w-screen bg-slate-400 p-7 dark:bg-slate-800 md:rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="flex w-full flex-col gap-5 p-5">
                <h1 className="mx-auto text-2xl font-bold">
                  Welcome to Netizen Space 🚀
                </h1>
                <div className="text-center text-sm text-slate-700 dark:text-slate-500">
                  <p className="">
                    Register your account. It's free and only takes a minute.
                  </p>
                  <p>Join our platform and let your voice be heard.</p>
                </div>

                <div className="flex w-full flex-col gap-5 md:flex-row md:gap-3">
                  <FormInput
                    title="email"
                    type="email"
                    placeholder="E.g. johndoe@example.com"
                  />
                  <FormInput
                    title="username"
                    type="text"
                    placeholder="E.g. johndoe"
                  />
                </div>

                <div className="flex w-full flex-col gap-5 md:flex-row md:gap-3">
                  <FormInput
                    title="firstName"
                    type="text"
                    placeholder="E.g. John"
                  />
                  <FormInput
                    title="lastName"
                    type="text"
                    placeholder="E.g. Doe"
                  />
                </div>

                <div className="flex w-full flex-col gap-5 md:flex-row md:gap-3">
                  <FormInput
                    title="password"
                    type="password"
                    placeholder="Password"
                  />
                  <FormInput
                    title="confirm"
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>

                <Dropzone
                  accept={{
                    "image/png": [".png"],
                    "image/jpeg": [".jpeg", ".jpg"],
                  }}
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex w-full cursor-pointer items-center justify-center rounded-md p-3 text-sm
                       text-slate-600 dark:bg-slate-900 dark:text-slate-500"
                    >
                      <DocumentArrowUpIcon className="mr-2 h-5 w-5" />
                      <p>
                        {values.picture
                          ? values.picture.name
                          : "add a profile picture (optional)"}
                      </p>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>

                <div className="flex w-full flex-col gap-5 md:flex-row md:gap-3">
                  <FormInput
                    title="occupation"
                    type="text"
                    placeholder="(Optional)"
                  />
                  <div className="flex flex-col gap-1 md:w-1/2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="country" className="text-xl font-bold">
                        Country
                      </label>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-xs text-red-500"
                      />
                    </div>
                    <Field
                      name="country"
                      as="select"
                      className="cursor-pointer rounded-md p-3 text-xl text-slate-900 dark:bg-slate-900 dark:text-white"
                    >
                      {countryList.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                {/* Terms of Service */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="acceptTerms" className="text-xl font-bold">
                      Terms of Service
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Field
                      name="acceptTerms"
                      type="checkbox"
                      className="h-4 w-4 accent-indigo-500"
                    />
                    <p>
                      I have read and agree to the terms of service and privacy
                      policy.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mx-auto mt-3 w-2/3 rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-500"
                >
                  SIGN UP
                </button>
                <p className="mx-auto text-xs">
                  Already have an account?{" "}
                  <Link to="/login">
                    <u>Log in.</u>
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

export default RegisterPage;
