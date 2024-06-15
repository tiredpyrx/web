const _isString = (value: any): value is string =>
  typeof value === "string";
const _isNumber = (value: any): value is number =>
  typeof value === "number";


function replaceHTMLEntitiesWithItsCorrespondingCharacters(str: string) {
  const htmlEntities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&nbsp;": " ",
    "&#039;": "'",
    "&ndash;": "-",
  };

  return str.replace(/&\w+;/g, (entity) => {
    return htmlEntities[entity as keyof typeof htmlEntities] || entity;
  });
}

export {
  _isString,
  _isNumber,
  replaceHTMLEntitiesWithItsCorrespondingCharacters
}