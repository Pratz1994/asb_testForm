import { useEffect, useState } from "react";
import Rules from "../helper/Rules";

interface InitChangeParams {
    fieldName: string;
    fieldValue: string;
  }

  interface useFormWrappParams {
    formConfig: any;
  }

  interface ObjectKeyVal {
    [key: string]: any;
  }

  interface ValidationParams {
    fieldName: string;
    fieldValue: string;
    allValues: ObjectKeyVal;
  }
  interface useFormWrappParams {
    formConfig: any;
  }
  
  interface SetNewDataParams {
    fieldName: string;
    fieldValue: string;
  }
  
  interface SetNewErrorParams {
    fieldName: string;
    fieldValue: Array<string>;
  }

const useFormWrapp = ({ formConfig }: useFormWrappParams) => {
    let formattedLabel: ObjectKeyVal = {};
    let formattedData: ObjectKeyVal = {};
    let formatttedError: ObjectKeyVal = {};

  

    // useEffect(() => {
    //     checkHasError();
    //     return () => {
    //       null;
    //     };
    //   }, [error]);

    Object.keys(formConfig).map((field) => {
        const key = field as keyof typeof formConfig;
        formattedData = { ...formattedData, [key]: formConfig[key]?.value };
        formatttedError = { ...formatttedError, [key]: formConfig[key]?.error };
        formattedLabel = {
            ...formattedLabel,
            [key]: {
              label: formConfig[key]?.hideStar
                ? formConfig[key]?.label
                : formConfig[key]?.rule.length > 0 &&
                  formConfig[key]?.rule.some(
                    (ruleItem: string) =>
                      ruleItem === "isNotNull" || ruleItem === "isConfirm",
                  )
                ? formConfig[key]?.label + " *"
                : formConfig[key]?.label,
              name: key,
            },
          };

        });

        const [label, setLabel] = useState<any>(formattedLabel);
        const [data, setData] = useState<any>(formattedData);
        const [error, setError] = useState<any>(formatttedError);
        const [hasError, setHasError] = useState<boolean>(false);
        
          // const checkHasError = () => {
          //   let errs: string[] = [];
          //   Object.keys(error).map((d) => {
          //     error[d].map((e: string) => {
          //       errs = [...errs, e];
          //     });
          //   });
          //   if (errs.length > 0) return setHasError(true);
          //   return setHasError(false);
          // };

          const setNewData = ({ fieldName, fieldValue }: SetNewDataParams) => {
            setData({ ...data, [fieldName]: fieldValue });
          };

          // const setNewError = ({ fieldName, fieldValue }: SetNewErrorParams) => {
          //   setError({ ...error, [fieldName]: fieldValue });
          // };

          const initSubmit = () => {
            // ALL FIELDS VALIDATION
            let Errors: ObjectKeyVal = {};
            const allValues = data;

            //validation check
            // Object.keys(data).map((fieldName) => {
            //   const key = fieldName as keyof typeof data;
            //   const fieldValue = data[key];
            //   const validationResponse = getValidation({
            //     fieldName,
            //     fieldValue,
            //     allValues,
            //   });
            //   Errors[fieldName] = validationResponse;
            // });

            // setError({ ...error, ...Errors });
            // const isError =
            //   Object.keys(Errors)
            //     .map((f) => Errors[f].length)
            //     .reduce((a, b) => a + b) > 0
            //     ? true
            //     : false;
            // return isError;
          };
        
          const initChange = ({ fieldName, fieldValue }: InitChangeParams) => {
            // SINGLE FIELD VALIDATION
            const allValues = { ...data, [fieldName]: fieldValue };
            setData(allValues);
            // getValidation({ fieldName, fieldValue, allValues });
          };

          // const getValidation = ({
          //   fieldName,
          //   fieldValue,
          //   allValues,
          // }: ValidationParams) => {
        
          //   let validationResponse: Array<string> = [];
            
          //   const rules = formConfig[fieldName].rule;
          //   rules.map((rule: string) => {
          //     const ruleName = rule as keyof typeof Rules;
          //     const validationFunction = Rules[ruleName];
          //     const isValidationFail = validationFunction({
          //       name: fieldName,
          //       value: fieldValue,
          //       allValues,
          //       allConfigs: formConfig,
          //     });
          //     if (isValidationFail)
          //       validationResponse = [...validationResponse, isValidationFail];
          //   });
          //   // SET
          //   setData({ ...data, [fieldName]: fieldValue });
          //   setError({ ...error, [fieldName]: validationResponse });
          //   return validationResponse;
          // };
   

    return {
        // formHasError: hasError,
        formLabel: label,
        formData: data,
        // formError: error,
        initChange,
        initSubmit,
        setNewData,
      };
}

export default useFormWrapp;