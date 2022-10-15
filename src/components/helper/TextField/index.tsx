import { FC } from "react";

interface Props {
  error: Array<string>;
  name: string;
  placeholder?: string;
  value: string;
  className?: string | null | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Index: FC<Props> = ({
  error,
  name,
  placeholder,
  value,
  className,
  onChange,
}) => {
  const defaultStyleValid =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const defaultStyleInValid =
    "bg-red-200 appearance-none border-1 border-red-200 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-skin-bdrError focus:ring-skin-rngError";
  let defaultStyle = defaultStyleValid;
  if (className) defaultStyle = className;
  if (error.length > 0) defaultStyle = defaultStyleInValid;

  return (
    <div className="mb-4">
      <input
        type="number"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={defaultStyle}
      />
    </div>
  );
};

export default Index;
