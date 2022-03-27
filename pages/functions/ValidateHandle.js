import ProductObject from "./ProductObject";

const ValidateHandle = (invalidProducts, id, product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase();
  const invalidHandle = {};

  if (productHandleized !== productHandle) {
    ProductObject(invalidProducts, id, title);

    invalidHandle = {
      expected: productHandleized,
      received: productHandle,
    };

    invalidProducts[id]["invalid handle"] = invalidHandle;
  }
};

export default ValidateHandle;
