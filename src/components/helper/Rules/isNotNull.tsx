interface ObjectKeyVal {
  [key: string]: any;
}

interface Params {
  name: string;
  value: string;
  allValues: ObjectKeyVal;
  allConfigs: ObjectKeyVal;
}

const isNotNull = ({ name, value, allValues, allConfigs }: Params) => {
  const cleanValue = value.trim();
  return cleanValue === "" || cleanValue === null
    ? "This field is required"
    : false;
};

export default isNotNull;
