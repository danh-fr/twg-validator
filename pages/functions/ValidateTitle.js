import ProductObject from "./ProductObject";

const ValidateTitle = (invalidProducts, id, title) => {
  const invalidTitle = {};

  if (!title.includes(" - ")) {
    ProductObject(invalidProducts, id, title);

    invalidTitle = {
      expected: "Product Name - Colour Name",
      received: title,
    };

    invalidProducts[id]["invalid title"] = invalidTitle;
  }
};

export default ValidateTitle;
