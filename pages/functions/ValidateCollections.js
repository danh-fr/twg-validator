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
    ProductObject(invalidProducts, id, title, "invalid collection", "product");

    const invalidProductCollection = {
      expected: productCollection,
      received: "(product collection not present)",
    };

    invalidProducts[id]["invalid collection"][
      "product"
    ] = invalidProductCollection;
  }

  if (colourCollectionExists === false) {
    ProductObject(invalidProducts, id, title, "invalid collection", "colour");

    const invalidColourCollection = {
      expected: colourCollection,
      received: "(colour collection not present)",
    };

    invalidProducts[id]["invalid collection"][
      "colour"
    ] = invalidColourCollection;
  }
};

export default ValidateCollections;
