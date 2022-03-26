import MakeProductObject from "./MakeProductObject";

const ValidateTitle = (faultyProducts, title) => {
  const invalidTitle = {};

  if (!title.includes(" - ")) {
    MakeProductObject(faultyProducts, title);

    invalidTitle = {
      expected: "Product Name - Colour Name",
      received: title,
    };

    faultyProducts[title]["invalid title"] = invalidTitle;
  }
};

export default ValidateTitle;
