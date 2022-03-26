import ProductObject from "./ProductObject";

const ValidateHandle = (invalidProducts, product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase();
  const invalidHandle = {};

  if (productHandleized !== productHandle) {
    ProductObject(invalidProducts, title);

    invalidHandle = {
      expected: productHandleized,
      received: productHandle,
    };

    invalidProducts[title]["invalid handle"] = invalidHandle;
  }
};

export default ValidateHandle;
