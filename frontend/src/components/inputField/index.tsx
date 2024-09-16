import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  error,
  register,
  placeholder,
}) => {
  return (
    <div className="center-col !items-start w-full my-1">
      <label className="text-background mb-2 ml-1" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full pl-2 text-background bg-transparent rounded-lg h-[50px] border border-solid border-[#413f00]"
        id={id}
        type={type}
        {...register}
      />
      {error && (
        <span className="text-destructive text-[12px] mt-1 opacity-90 ml-1">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
