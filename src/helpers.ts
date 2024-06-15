/**
 *
 * @param {any} value Is given value typeof string
 * @returns {boolean} Result statment
 */
const _isString = (value: any): value is string => typeof value === "string";

/**
 *
 * @param {any} value Is given value typeof number
 * @returns {boolean} Result statment
 */
const _isNumber = (value: any): value is number => typeof value === "number";

/**
 *
 * @param {string} text Text (string) that entities will be searched in.
 * @param {Object} [entities] An object that holds key value pairs as entitiy - replace value. If not provded, internal object will be used.
 * @returns {string} Given text that entities replaced with their corresponding characters
 */
function replaceHTMLEntitiesWithItsCorrespondingCharacters(
  text: string,
  entities?: { [key: string]: string }
): string {
  const htmlEntities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&nbsp;": " ",
    "&#039;": "'",
    "&ndash;": "-",
  };

  return text.replace(/&\w+;/g, (word) => {
    return htmlEntities[word as keyof typeof htmlEntities] || word;
  });
}

export {
  _isString,
  _isNumber,
  replaceHTMLEntitiesWithItsCorrespondingCharacters,
};
