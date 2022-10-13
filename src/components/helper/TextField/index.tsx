import { FC } from 'react';

interface Props {
  // error: Array<string>;
  name: string;
  placeholder?: string;
  value: string;
  className?: string | null | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Index: FC<Props> = ({
  // error,
  name,
  placeholder,
  value,
  className,
  onChange,
}) => {
  const defaultStyle =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  // if (error.length > 0) defaultStyle = defaultStyleInValid;

  return (
    <div className="mb-4">
    <input
      type="text"
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
