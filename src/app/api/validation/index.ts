/**
 * @fileoverview This file is the main file for request validation
 */

import { VALIDATON_RULES_ENUM, VALIDATON_RULES_ERROR_MESSAGES, VALIDATON_RULES_ACTIONS } from "./rules";

/**
 *
 * @param upcomingData
 * @param rules
 * @returns Error message array
 * @description Validate upcoming request with provided rules, passed data must be converted to json first.
 * Rules must be an object that holds field names as keys an rules as values.
 * Rules's values can be a string or a string array, every rule value that are typeof string must be divided with symbol "|".
 */
export async function validate(
  upcomingData: any,
  rules: { [key: string]: Array<string> | string }
): Promise<string[]> {
  let errors = {} as { [fieldName: string]: Array<string> };
  let errorMessages: Array<string> = [];
  for (const fieldName in rules) {
    const fieldValue = upcomingData[fieldName];
    let _fieldRules = rules[fieldName];
    if (_isString(_fieldRules)) _fieldRules = _fieldRules.split("|");
    const fieldRulesArray = _fieldRules;
    for (const rule of fieldRulesArray) {
      console.log("upcoming data is: ", upcomingData);
      console.log("upcoming rule is: ", rule);
      console.log("so far errors are: ", errors);
      console.log("rules that passed to validate function are: ", rules);

      // todo: fix upcoming rule types so we dont have to cast the ruel type
      // todo: if arguments lenght of VALIDATON_RULES_ACTIONS[rule] is > 1 then _validationResultBool(upcomingData[fieldName], rule.substring(":"))
      const validationResultBool = VALIDATON_RULES_ACTIONS[rule as "string"|"number"]
      console.log("validation result type for rule %s is : ", rule, validationResultBool(upcomingData[fieldName]));
      if (!validationResultBool(fieldValue)) {
        console.log("we found en error for rule: ", rule);
        let new_error_message = getErrorMessageForSingleRule(
          rule as keyof typeof VALIDATON_RULES_ENUM
        );
        let oldErrorsForField = errors[fieldName] || [];
        errors = {
          ...errors,
          [fieldName]: [...oldErrorsForField, new_error_message],
        };
      } else {
        console.log("we couldn't find an error for rule: ", rule);
      }
    }
    console.log("errors after last field are: ", errors);
  }
  console.log("all errors are: ", errors);

  // create error messages for every errors property, if any
  for (const fieldName in errors) {
    const fieldErrorMessageArray = errors[fieldName];
    for (const fieldErrorMessage of fieldErrorMessageArray) {
      console.log(fieldErrorMessage);
      const formattedFieldErrorMessage =
        getFormattedValidationErrorMessageForField(
          fieldName,
          fieldErrorMessage
        );
      errorMessages.push(formattedFieldErrorMessage);
    }
  }
  return errorMessages;
}

function createFormattedValidationErrorMessageForField(
  fieldName: string,
  message: string
) {
  return (
    fieldName.charAt(0).toUpperCase().concat(fieldName.substring(1)) +
    " " +
    message
  );
}

function getFormattedValidationErrorMessageForField(
  fieldName: string,
  message: string
) {
  return createFormattedValidationErrorMessageForField(fieldName, message);
}

function validateFieldForSingleRule(
  data: any,
  fieldName: string,
  rule: string
) {
  const fieldValue = data[fieldName];
  switch (rule) {
    case VALIDATON_RULES_ENUM.required:
      return (
        typeof fieldValue !== "undefined" &&
        fieldValue !== null &&
        fieldValue !== ""
      );
      break;
    case VALIDATON_RULES_ENUM.string:
      return typeof fieldValue === "string";
      break;
    default:
      throw new Error("Given rule is not in the ValidationRules!"); // if given rule is not in rules throw error
  }
}

function getErrorMessageForSingleRule(
  rule: keyof typeof VALIDATON_RULES_ERROR_MESSAGES
) {
  return VALIDATON_RULES_ERROR_MESSAGES[rule];
}


function _isString(value: any): value is string {
  return typeof value === "string";
}
