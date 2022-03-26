import ProductObject from "./ProductObject";

const ValidateTitle = (invalidProducts, title) => {
  const invalidTitle = {};

  if (!title.includes(" - ")) {
    ProductObject(invalidProducts, title);

    invalidTitle = {
      expected: "Product Name - Colour Name",
      received: title,
    };

    invalidProducts[title]["invalid title"] = invalidTitle;
  }
};

export default ValidateTitle;
