import ProductObject from "./ProductObject";

const ValidateOptions = (invalidProducts, id, product, title) => {
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
    const error = "invalid option - size";
    const expected = "Size";
    const received = "(size option not present or misspelled)";

    ProductObject(invalidProducts, id, title, error, expected, received);
  }

  if (colourExists === false) {
    const error = "invalid option - colour";
    const expected = "Colour";
    const received = "(colour option not present or misspelled)";

    ProductObject(invalidProducts, id, title, error, expected, received);
  }
};

export default ValidateOptions;
