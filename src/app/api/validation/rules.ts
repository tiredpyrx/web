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
  // is_type_of: (value: any, type: any): value is typeof type => value === type,
  min: (value: string | number, min: number) =>
    _isString(value) ? value.length >= min : value >= min,
  max: (value: string | number, max: number) =>
    _isString(value) ? value.length <= max : value <= max,
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
  [key: Partial<"required">]: (...args: any) => { message: string; success: boolean };
} = {
  requried(fieldName: string, value: any) {
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
  min(fieldName: string, value: any, min: number) {
    return {
      message: _createErrorMessage(fieldName, "min"),
      success: VALIDATON_RULES_ACTIONS.min(value, min),
    };
  },
  max(fieldName: string, value: any, max: number) {
    return {
      message: _createErrorMessage(fieldName, "max"),
      success: VALIDATON_RULES_ACTIONS.min(value, max),
    };
  },
} as const;

const validateForField = (fieldName: string, value: any, ruleParams: {
  min: number,
  max: number
}) => {
  return VALIDATON_RULES.asdas;
}

function _createErrorMessage(
  fieldName: string,
  rule: keyof typeof VALIDATON_RULES_ERROR_MESSAGES
): string {
  return fieldName + " " + VALIDATON_RULES_ERROR_MESSAGES[rule];
}

const _isString = (value: any): value is string => typeof value === "string";
const _isNumber = (value: any): value is number =>
  typeof value === "number" ||
  (_isMatchable(value) && _isMatched(value, /^\d+(\.\d+)?$/));
const _isDecimal = (value: any) =>
  _isMatchable(value) && _isMatched(value, /^\d+(\.\d+)$/);
const _isInteger = (value: any) =>
  _isMatchable(value) && _isMatched(value, /^\d+$/); // match will result as an array or null, cast it to boolean

const _isMatchable = (value: any): value is number | string =>
  typeof value === "number" || _isString(value);
const _isMatched = (value: number | string, regexp: RegExp) =>
  Boolean(String(value).match(regexp));
