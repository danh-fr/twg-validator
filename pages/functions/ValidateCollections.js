import ProductObject from "./ProductObject";

const ValidateCollections = (invalidProducts, id, product, title) => {
  let collections = product.node.collections.edges;
  let productCollection = `Product: ${title.split(" - ")[0]}`;
  let colourCollection = `Colour: ${title.split(" - ")[1]}`;
  let productCollectionExists = false;
  let colourCollectionExists = false;

  for (let collection of collections) {
    collection.node.title === productCollection
      ? (productCollectionExists = true)
      : "";
    collection.node.title === colourCollection
      ? (colourCollectionExists = true)
      : "";
  }

  if (productCollectionExists === false) {
    const error = "invalid collection - product";
    const expected = productCollection;
    const received = "(product collection not present)";

    ProductObject(invalidProducts, id, title, error, expected, received);
  }

  if (colourCollectionExists === false) {
    const error = "invalid collection - colour";
    const expected = colourCollection;
    const received = "(colour collection not present)";

    ProductObject(invalidProducts, id, title, error, expected, received);
  }
};

export default ValidateCollections;
