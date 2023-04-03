import { ErrorMessage, Field } from "formik";
import React from "react";

const FormInput = ({
  title,
  type,
  placeholder,
  fullWidth = false,
}: {
  title: string;
  type: string;
  placeholder: string;
  fullWidth?: boolean;
}) => {
  const fieldName = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className={`flex flex-col gap-1 ${!fullWidth && "md:w-1/2"}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={title} className="text-xl font-bold">
          {fieldName}
        </label>
        <ErrorMessage
          name={title}
          component="div"
          className="text-xs text-red-500"
        />
      </div>
      <Field
        name={title}
        type={type}
        className="rounded-md p-3 text-xl text-slate-900 dark:bg-slate-900 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
