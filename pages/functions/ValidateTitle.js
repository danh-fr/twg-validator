import ProductObject from "./ProductObject";

const ValidateTitle = (invalidProducts, id, title) => {
  if (!title.includes(" - ")) {
    const error = "invalid title";
    const expected = "Product Name - Colour Name";
    const received = title;

    ProductObject(invalidProducts, id, title, error, expected, received);
  }
};

export default ValidateTitle;
