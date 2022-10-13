import { FC } from "react";
import TextFieldLabel from "../helper/TextLabel";
import TextField from "../helper/TextField";
import Button from "../helper/Button";
import useFormWrapp from "../hooks";
import DateField from "../helper/DateField";
import moment from "moment";

interface onChangeParams {
  name: string;
  value: string;
}

const Registration: FC = () => {
  const formConfig = {
    cardNumber: {
      label: "Card Number",
      value: "",
      rule: ["isMinMax"],
      error: [],
    },
    cvc: {
      label: "CVC",
      value: "",
      rule: ["isMinMax"],
      error: [],
    },
    firstName: {
      label: "First Name",
      value: "",
      rule: [],
      error: [],
    },
    date: {
      label: "Expiry Date",
      value: "",
      rule: [],
      error: [],
    },
  };

  const {
    formLabel,
    formData,
    // formError,
    initSubmit,
    initChange
  } = useFormWrapp({
    formConfig,
  });

  const onChange = ({ name, value }: onChangeParams) => {
    initChange({ fieldName: name, fieldValue: value });
  };

    const onSubmit = (event: { preventDefault: () => void; }) =>{
      event.preventDefault();
      initSubmit()
        console.log("values",formData);
    }

  return (
    //body
    
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
      <TextFieldLabel label={formLabel.cardNumber} />
      <TextField
        // error={formError.cardNumber}
        name="cardNumber"
        value={formData.cardNumber}
        onChange={(e) => {
            onChange({ name: "cardNumber", value: e.target.value });
          }}
      />
      <TextFieldLabel label={formLabel.cvc} />
      <TextField
        // error={formError.cvc}
        name="cvc"
        value={formData.cvc}
        onChange={(e) => {
            onChange({ name: "cvc", value: e.target.value });
        }}
      />
      <TextFieldLabel label={formLabel.date} />
      <DateField
        // error={formError.date}
        name="date"
        value={formData.date}
        onChange={(e: Date) => {
            onChange({
              name: "date",
              value: moment(e.toString()).format("yyyy-MM-DD"),
            });
          }}
      />
  
      <Button label="Submit" isTrue={undefined} />
    </form>
    
  );
};
export default Registration;
