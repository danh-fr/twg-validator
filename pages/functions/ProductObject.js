const ProductObject = (
  invalidProducts,
  id,
  title,
  error,
  expected,
  received
) => {
  !invalidProducts[id] ? (invalidProducts[id] = {}) : "";
  !invalidProducts[id][title] ? (invalidProducts[id]["product"] = title) : "";
  !invalidProducts[id]["errors"] ? (invalidProducts[id]["errors"] = {}) : "";

  invalidProducts[id]["errors"][error] = {};
  invalidProducts[id]["errors"][error]["Expected"] = expected;
  invalidProducts[id]["errors"][error]["Received"] = received;
};

export default ProductObject;
