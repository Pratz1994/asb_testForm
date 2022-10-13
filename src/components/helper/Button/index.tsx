import React from "react";

interface Props {
  label: string;
  isTrue:boolean | undefined;
  className?: string | null | undefined;
}

const Index: React.FC<Props> = ({ label, className, isTrue }) => {
  let defaultStyle =
    "py-2 px-4 bg-skin-bgPrimary text-skin-txPrimary font-semibold rounded-lg shadow-md hover:bg-skin-bgPrimaryHover focus:outline-none";
  if (className) defaultStyle = defaultStyle.concat(" ", className);
  if(isTrue) defaultStyle = "py-2 px-4 bg-skin-bgPrimaryMuted text-skin-txPrimary font-semibold rounded-lg shadow-md focus:outline-none";

  return (
    <button type="submit" className={defaultStyle}>
      {label}
    </button>
  );
};

export default Index;
