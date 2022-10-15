import React from "react";

import MainForm from "./main";
import User from "./user";

const Index: React.FC = () => {
  return (
    <div
      className="h-screen flex flex-col items-center 
       justify-center border rounded "
    >
      <div className="">
        <User />
        <MainForm />
      </div>
    </div>
  );
};

export default Index;
