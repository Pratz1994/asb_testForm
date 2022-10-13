import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface Props {
  // error: Array<string>;
  name: string;
  value: string;
  className?: string | null | undefined;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (date: Date) => void;
}

const Index: React.FC<Props> = ({
  // error,
  name,
  value,
  className,
  onChange,
}) => {
  const defaultStyleValid =
    "relative bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-skin-bdrPrimary focus:ring-skin-rngPrimary";
  // if (error.length > 0) defaultStyle = defaultStyleInValid;

  return (
    <div className="mb-4">
      {/* <DatePicker
        placeholderText="YYYY-MM-DD"
        dateFormat="yyyy-MM-dd"
        id={name}
        name={name}
        autoComplete="off"
        selected={value ? new Date(value) : null}
        className={defaultStyle}
        onChange={onChange}
      /> */}
   <DatePicker
   dateFormat="MMMM yyyy"
   showMonthYearPicker
   selected={value ? new Date(value) : null}
   onChange={onChange}
   className={defaultStyleValid}
   
/>
    </div>
  );
};

export default Index;
