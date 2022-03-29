import ProductObject from "./ProductObject";

const ValidateHandle = (invalidProducts, id, product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase();

  if (productHandleized !== productHandle) {
    const error = "invalid handle";
    const expected = productHandleized;
    const received = productHandle;

    ProductObject(invalidProducts, id, title, error, expected, received);
  }
};

export default ValidateHandle;
