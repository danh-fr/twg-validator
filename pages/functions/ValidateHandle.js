import MakeProductObject from "./MakeProductObject";

const ValidateHandle = (faultyProducts, product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase();
  const invalidHandle = {};

  if (productHandleized !== productHandle) {
    MakeProductObject(faultyProducts, title);

    invalidHandle = {
      expected: productHandleized,
      received: productHandle,
    };

    faultyProducts[title]["invalid handle"] = invalidHandle;
  }
};

export default ValidateHandle;
