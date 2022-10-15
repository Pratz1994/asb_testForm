import React from "react";

interface Props {
  label: string;
  isTrue:boolean | undefined;
  className?: string | null | undefined;
}

const Index: React.FC<Props> = ({ label, className, isTrue }) => {
  let defaultStyle =
   "bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded";

  return (
    <button type="submit" className={defaultStyle}>
      {label}
    </button>
  );
};

export default Index;
