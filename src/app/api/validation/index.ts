/**
 * @fileoverview This file is the main file for request validation
 */

import { _isString } from "@/helpers";
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
 * @description Validate upcoming request with provided rules, passed request data must be converted to json first.
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
    for (let rule of fieldRulesArray) {
      let validationObject;
      const ruleHasParamSeparator = rule.includes(":")
      if (ruleHasParamSeparator) {
        const ruleParam = rule.slice(rule.lastIndexOf(":") + 1);
        rule = rule.substring(0, rule.lastIndexOf(":"));
        validationObject = validateForField(
          fieldName,
          rule,
          fieldValue,
          ruleParam
        );
      } else validationObject = validateForField(fieldName, rule, fieldValue);

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
