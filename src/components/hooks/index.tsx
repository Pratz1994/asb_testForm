import { useState } from "react";

import Rules from "../helper/Rules";

interface useFormWrappParams {
  formConfig: any;
}

interface SetNewOptionParams {
  fieldName: string;
  fieldOptions: [];
}

interface SetNewDataParams {
  fieldName: string;
  fieldValue: string;
}

interface SetNewErrorParams {
  fieldName: string;
  fieldValue: Array<string>;
}

interface ObjectKeyVal {
  [key: string]: any;
}

interface ValidationParams {
  fieldName: string;
  fieldValue: string;
  allValues: ObjectKeyVal;
}

interface InitChangeParams {
  fieldName: string;
  fieldValue: string;
}

// interface InitSubmitParams {
// }

const useFormWrapp = ({ formConfig }: useFormWrappParams) => {
  let formattedOption: ObjectKeyVal = {};
  let formattedLabel: ObjectKeyVal = {};
  let formattedData: ObjectKeyVal = {};
  let formatttedError: ObjectKeyVal = {};
  Object.keys(formConfig).map((field) => {
    const key = field as keyof typeof formConfig;
    formattedData = { ...formattedData, [key]: formConfig[key]?.value };
    formatttedError = { ...formatttedError, [key]: formConfig[key]?.error };
    // label
    formattedLabel = {
      ...formattedLabel,
      [key]: {
        label: formConfig[key]?.hideStar
          ? formConfig[key]?.label
          : formConfig[key]?.rule.length > 0 &&
            formConfig[key]?.rule.some(
              (ruleItem: string) => ruleItem === "isNotNull"
            )
          ? formConfig[key]?.label + " *"
          : formConfig[key]?.label,
        name: key,
      },
    };
    // option
    formattedOption = {
      ...formattedOption,
      [key]: formConfig[key]?.options ? formConfig[key]?.options : [],
    };
  });

  const [option, setOption] = useState<any>(formattedOption);
  const [label, setLabel] = useState<any>(formattedLabel);
  const [data, setData] = useState<any>(formattedData);
  const [error, setError] = useState<any>(formatttedError);
  const [globalError, setGlobalError] = useState<any>([]);
  const [hasError, setHasError] = useState<boolean>(false);


  const setNewOption = ({ fieldName, fieldOptions }: SetNewOptionParams) => {
    setOption({ ...option, [fieldName]: fieldOptions });
  };

  const setNewData = ({ fieldName, fieldValue }: SetNewDataParams) => {
    setData({ ...data, [fieldName]: fieldValue });
  };

  const setBulkData = (newObj: ObjectKeyVal) => {
    setData({ ...data, ...newObj });
  };

  const setNewError = ({ fieldName, fieldValue }: SetNewErrorParams) => {
    setError({ ...error, [fieldName]: fieldValue });
  };

  const setBulkError = (newObj: ObjectKeyVal) => {
    setError({ ...error, ...newObj });
  };
  const assignDefault = (newData: ObjectKeyVal) => {
    const initData: ObjectKeyVal = {};
    Object.keys(formConfig).map((key: string) => {
      const _getKeyValue_ = (key: string) => (obj: Record<string, any>) =>
        obj[key];
      const objFound = _getKeyValue_(key)(formConfig);
      if (objFound.options && objFound.options.length > 0) {
        initData[key] = objFound.options[0].value;
      } else if (objFound.initial && objFound.initial.length > 0) {
        initData[key] = objFound.initial;
      }
    });
    // assign pre loaded data from server
    const dataFromServer: ObjectKeyVal = { ...newData };
    Object.keys(dataFromServer).map((key: string) => {
      const _getKeyValue_ = (key: string) => (obj: Record<string, any>) =>
        obj[key];
      const objFound = _getKeyValue_(key)(dataFromServer);
      if (objFound !== undefined) {
        initData[key] = objFound;
      }
    });
    setBulkData(initData);
  };

  // NEW PROTOTYPE
  const initSubmit = () => {
    // ALL FIELDS VALIDATION
    let Errors: ObjectKeyVal = {};
    const allValues = data;
    Object.keys(data).map((fieldName) => {
      const key = fieldName as keyof typeof data;
      const fieldValue = data[key];
      const validationResponse = getValidation({
        fieldName,
        fieldValue,
        allValues,
      });
      Errors[fieldName] = validationResponse;
    });
    setError({ ...error, ...Errors });
    const isError =
      Object.keys(Errors)
        .map((f) => Errors[f].length)
        .reduce((a, b) => a + b) > 0
        ? true
        : false;
    return isError;
  };

  const initChange = ({ fieldName, fieldValue }: InitChangeParams) => {
    // SINGLE FIELD VALIDATION
    const allValues = { ...data, [fieldName]: fieldValue };
    getValidation({ fieldName, fieldValue, allValues });
  };

  const getValidation = ({
    fieldName,
    fieldValue,
    allValues,
  }: ValidationParams) => {
    let validationResponse: Array<string | boolean> = [];

    const rules = formConfig[fieldName].rule;
    rules.map((rule: string) => {
      const ruleName = rule as keyof typeof Rules;
      const validationFunction = Rules[ruleName];
      const isValidationFail = validationFunction({
        name: fieldName,
        value: fieldValue,
        allValues,
        allConfigs: formConfig,
      });
      if (isValidationFail)
        validationResponse = [...validationResponse, isValidationFail];
    });
    // SET
    setData({ ...data, [fieldName]: fieldValue });
    setError({ ...error, [fieldName]: validationResponse });
    return validationResponse;
  };
  // END NEW PROTOTYPE

  return {
    formHasError: hasError,
    formOption: option,
    formLabel: label,
    formData: data,
    formError: error,
    formGlobalError: globalError,
    assignDefault,
    setNewOption,
    setNewData,
    setBulkData,
    setNewError,
    setBulkError,
    setGlobalError,
    initChange,
    initSubmit,
  };
};

export default useFormWrapp;
