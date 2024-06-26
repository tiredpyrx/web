import { _isString, _isNumber as isNumber } from "@/helpers";

export enum VALIDATON_RULES_ENUM {
  required = "required",
  string = "string",
  number = "number",
  integer = "integer",
  min = "min",
  max = "max",
}
export const VALIDATON_RULES_ACTIONS = {
  required: (value: any) =>
    typeof value !== "undefined" && value !== null && value !== "",
  string: (value: any) => _isString(value),
  number: (value: any) => _isNumber(value),
  integer: (value: any) => _isInteger(value),
  decimal: (value: any) => _isDecimal(value),
  min: (value: string|number, min: string|number) => Number(value) >= Number(min),
  max: (value: string|number, max: string|number) => Number(value) <= Number(max),
  lengthmin: (value: string, min: number|string) => value.length >= Number(min),
  lengthmax: (value: string, min: number|string) => value.length <= Number(min),
} as const;

export const VALIDATON_RULES_ERROR_MESSAGES = {
  required: "field is required!",
  string: "field must be typeof string!",
  number: "field must be typeof number!",
  integer: "field value must be integer!",
  decimal: "field value must be decimal!",
  min: "field value must be minimum :slug!",
  max: "field value must be maximum :slug!",
} as const;

const VALIDATON_RULES: {
  [key: string]: (
    name: string,
    value: any,
    param?: string | number
  ) => {
    message: string;
    success: boolean;
  };
} = {
  required(fieldName: string, value: any) {
    return {
      message: _createErrorMessage(fieldName, "required"),
      success: VALIDATON_RULES_ACTIONS.required(value),
    };
  },
  string(fieldName: string, value: any) {
    return {
      message: _createErrorMessage(fieldName, "string"),
      success: VALIDATON_RULES_ACTIONS.string(value),
    };
  },
  number(fieldName: string, value: any) {
    return {
      message: _createErrorMessage(fieldName, "number"),
      success: VALIDATON_RULES_ACTIONS.number(value),
    };
  },
  integer(fieldName: string, value: any) {
    return {
      message: _createErrorMessage(fieldName, "integer"),
      success: VALIDATON_RULES_ACTIONS.integer(value),
    };
  },
  decimal(fieldName: string, value: any) {
    return {
      message: _createErrorMessage(fieldName, "decimal"),
      success: VALIDATON_RULES_ACTIONS.decimal(value),
    };
  },
  min(fieldName: string, value: any, min?: string | number) {
    min = Number(min);
    return {
      message: _createErrorMessage(fieldName, "min", min),
      success: VALIDATON_RULES_ACTIONS.min(value, min),
    };
  },
  max(fieldName: string, value: any, max?: string|number) {
    max = Number(max);
    return {
      message: _createErrorMessage(fieldName, "max", max),
      success: VALIDATON_RULES_ACTIONS.max(value, max),
    };
  },
} as const;

export function validateForField(
  fieldName: string,
  rule: string,
  value: any,
  param?: string | number
) {
  if (param)
    return VALIDATON_RULES[rule as keyof typeof VALIDATON_RULES](
      fieldName,
      value,
      param
    );

  return VALIDATON_RULES[rule as keyof typeof VALIDATON_RULES](
    fieldName,
    value
  );
}

function _createErrorMessage(
  fieldName: string,
  rule: keyof typeof VALIDATON_RULES_ERROR_MESSAGES,
  slug?: string | number
): string {
  const messagePrefix = VALIDATON_RULES_ERROR_MESSAGES[rule].includes(":slug")
    ? VALIDATON_RULES_ERROR_MESSAGES[rule].replace(":slug", String(slug))
    : VALIDATON_RULES_ERROR_MESSAGES[rule];
  return (
    fieldName.charAt(0).toUpperCase() +
    fieldName.substring(1) +
    " " +
    messagePrefix
  );
}

const _isNumber = (value: any): value is number =>
  isNumber(value) ||
  (_isMatchable(value) && _isMatched(value, /^\d+(\.\d+)?$/));
const _isDecimal = (value: any) =>
  _isMatchable(value) && _isMatched(value, /^\d+(\.\d+)$/);
const _isInteger = (value: any) =>
  _isMatchable(value) && _isMatched(value, /^\d+$/); // match will result as an array or null, cast it to boolean

const _isMatchable = (value: any): value is number | string =>
  typeof value === "number" || _isString(value);
const _isMatched = (value: number | string, regexp: RegExp) =>
  Boolean(String(value).match(regexp));
