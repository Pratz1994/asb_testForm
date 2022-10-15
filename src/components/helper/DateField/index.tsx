import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  error: Array<string>;
  placeholder: string;
  name: string;
  value: string;
  className?: string | null | undefined;
  onChange: (date: Date) => void;
}

const Index: React.FC<Props> = ({
  error,
  placeholder,
  value,
  className,
  onChange,
}) => {
  const defaultStyleValid =
    "relative bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-skin-bdrPrimary focus:ring-skin-rngPrimary";
  const defaultStyleInValid =
    "relative bg-red-200 appearance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-skin-bdrError focus:ring-skin-rngError";
  let defaultStyle = defaultStyleValid;
  if (className) defaultStyle = className;
  if (error.length > 0) defaultStyle = defaultStyleInValid;

  return (
    <div className="mb-4">
      <DatePicker
        dateFormat="MM/yy"
        showMonthYearPicker
        selected={value ? new Date(value) : null}
        minDate={new Date()}
        onChange={onChange}
        className={defaultStyle}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default Index;
