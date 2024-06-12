/**
 * @fileoverview This file is the main file for request validation
 */

import {
  VALIDATON_RULES_ENUM,
  VALIDATON_RULES_ERROR_MESSAGES,
  VALIDATON_RULES_ACTIONS,
  validateForField,
} from "./rules";

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
): Promise<{
  failed: boolean;
  succeed: boolean;
  validated: Array<string>;
  errorMessages: string[];
}> {
  let errors = {} as { [fieldName: string]: Array<string> };
  let validated = [];
  let errorMessages: Array<string> = [];
  for (const fieldName in rules) {
    const fieldValue = upcomingData[fieldName];
    let _fieldRules = rules[fieldName];
    if (_isString(_fieldRules)) _fieldRules = _fieldRules.split("|");
    const fieldRulesArray = _fieldRules;
    for (const rule of fieldRulesArray) {
      const validationObject = validateForField(fieldName, rule, fieldValue);

      if (!validationObject.success) {
        let oldFieldErrors = errors[fieldName] || [];
        errors = {
          ...errors,
          [fieldName]: [...oldFieldErrors, validationObject.message],
        };
      } else {
        validated.push(fieldName);
      }
    }
  }

  for (const fieldErrors of Object.values(errors)) {
    for (const fieldError of fieldErrors) {
      errorMessages.push(fieldError);
    }
  }
  return {
    succeed: !Boolean(errorMessages.length),
    failed: Boolean(errorMessages.length),
    errorMessages,
    validated,
  };
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
