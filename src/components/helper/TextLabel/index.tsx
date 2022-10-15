import { FC } from "react";

interface Label {
  name: string;
  label: string;
}

interface Props {
  label: Label;
  className?: string | null | undefined;
}

const Index: FC<Props> = ({ label, className }) => {
  console.log("label", label);
  let defaultStyle = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <label className={defaultStyle} htmlFor={label.name}>
      {label.label}
    </label>
  );
};

export default Index;
