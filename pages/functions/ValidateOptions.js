import ProductObject from "./ProductObject";

const ValidateOptions = (invalidProducts, product, title) => {
  let productOptions = product.node.options;
  let sizeExists = false;
  let colourExists = false;
  let oneSize = false;
  let oneSizeItems = ["Bag", "Clutch", "Tote", "Wallet", "Keychain", "Card"];

  for (let option of productOptions) {
    option.name === "Size" ? (sizeExists = true) : "";
    option.name === "Colour" ? (colourExists = true) : "";
  }

  for (let item of oneSizeItems) {
    if (title.includes(item)) {
      oneSize = true;
    }
  }

  if (sizeExists === false && oneSize === false) {
    ProductObject(invalidProducts, title, "invalid options", "size");

    const invalidSize = {
      expected: "Size",
      received: "(size option not present or misspelled)",
    };

    invalidProducts[title]["invalid options"]["size"] = invalidSize;
  }

  if (colourExists === false) {
    ProductObject(invalidProducts, title, "invalid options", "colour");

    const invalidColour = {
      expected: "Colour",
      received: "(colour option not present or misspelled)",
    };

    invalidProducts[title]["invalid options"]["colour"] = invalidColour;
  }
};

export default ValidateOptions;
