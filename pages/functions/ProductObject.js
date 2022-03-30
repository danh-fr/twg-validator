const ProductObject = (
  invalidProducts,
  id,
  title,
  error,
  expected,
  received
) => {
  !invalidProducts[title] ? (invalidProducts[title] = {}) : "";

  !invalidProducts[title]["id"] ? (invalidProducts[title]["id"] = id) : "";

  !invalidProducts[title]["errors"]
    ? (invalidProducts[title]["errors"] = {})
    : "";

  invalidProducts[title]["errors"][error] = {};
  invalidProducts[title]["errors"][error]["Expected"] = expected;
  invalidProducts[title]["errors"][error]["Received"] = received;
};

export default ProductObject;
