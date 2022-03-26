import * as React from "react";
import { gql, useQuery } from "@apollo/client";

const faultyProducts = {};

const makeProductObject = (parent, child, grandchild) => {
  !faultyProducts[parent] ? (faultyProducts[parent] = {}) : "";

  if (child) {
    !faultyProducts[parent][child] ? (faultyProducts[parent][child] = {}) : "";
  }

  if (grandchild) {
    !faultyProducts[parent][child][grandchild]
      ? (faultyProducts[parent][child][grandchild] = {})
      : "";
  }
};

const validateTitle = (title) => {
  const invalidTitle = {};

  if (!title.includes(" - ")) {
    makeProductObject(title);

    invalidTitle = {
      "invalid title": {
        expected: "Product Name - Colour Name",
        received: title,
      },
    };

    faultyProducts[title] = invalidTitle;
  }
};

const validateHandle = (product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase();
  const invalidHandle = {};

  if (productHandleized !== productHandle) {
    makeProductObject(title);

    invalidHandle = {
      "invalid handle": {
        expected: productHandleized,
        received: productHandle,
      },
    };

    faultyProducts[title] = invalidHandle;
  }
};

const ValidateOptions = (product, title) => {
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
    makeProductObject(title, "invalid options", "size");

    // const invalidSize = {};
    const invalidSize = {
      expected: "Size",
      received: "(size option not present or misspelt)",
    };

    faultyProducts[title]["invalid options"]["size"] = invalidSize;
  }

  if (colourExists === false) {
    makeProductObject(title, "invalid options", "colour");

    // const invalidColour = {};
    const invalidColour = {
      expected: "Colour",
      received: "(colour option not present or misspelt)",
    };

    faultyProducts[title]["invalid options"]["colour"] = invalidColour;
  }
};

const validateCollections = (product, title, name, colour) => {
  let collections = product.node.collections.edges;
  let productCollection = `Product: ${name}`;
  let colourCollection = `Colour: ${colour}`;
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
    !faultyProducts[title] ? (faultyProducts[title] = []) : "";
    faultyProducts[title].push("Collection error: Product");
  }

  if (colourCollectionExists === false) {
    !faultyProducts[title] ? (faultyProducts[title] = []) : "";
    faultyProducts[title].push("Collection error: Colour");
  }
};

const PRODUCTS = gql`
  query products {
    products(first: 100) {
      edges {
        node {
          title
          handle
          options(first: 2) {
            name
          }
          collections(first: 1) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading products..</p>;
  if (error) console.log("Error: ", error.message);

  data.products.edges.map((product) => {
    let title = product.node.title;
    let name = title.split(" - ")[0];
    let colour = title.split(" - ")[1];

    validateTitle(title);
    validateHandle(product, title);
    ValidateOptions(product, title);
    // validateCollections(product, title, name, colour)
  });

  return (
    <div>
      <pre>{JSON.stringify(faultyProducts, null, 2)}</pre>
    </div>
  );
};

export function ValidateProducts() {
  return <ProductList />;
}
