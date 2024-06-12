const POST_RULES = {
  title: ["required", "string"],
  quantity: ["required", "number"]
}; // we must declare here as cont so it will be read only woho, maybe create a file that gets a object and returns its type as readonly!!!!!!!! probably in validate.ts or rules.ts? or validation/valiate.ts and validation.rules.ts, i like the last one better

export { POST_RULES };
