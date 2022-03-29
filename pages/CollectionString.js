import * as React from "react";
import { concat, gql, useQuery } from "@apollo/client";

const invalidProducts = {};
let stringProduct = "";
let stringColour = "";

const validateTitle = (title) => {
  if (!title.includes(" - ")) {
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Title error");
  }
};

const validateHandle = (product, title) => {
  let productHandle = product.node.handle;
  let productHandleized = product.node.title
    .replaceAll(" - ", " ")
    .replaceAll(" ", "-")
    .toLowerCase();

  if (productHandleized !== productHandle) {
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Handle mismatch");
  }
};

const ValidateOptions = (product, title) => {
  let productOptions = product.node.options;
  let sizeExists = false;
  let colourExists = false;

  for (let option of productOptions) {
    option.name === "Size" ? (sizeExists = true) : "";
    option.name === "Colour" ? (colourExists = true) : "";
  }

  if (sizeExists === false) {
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Option error: Size");
  }

  if (colourExists === false) {
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Option error: Colour");
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
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Collection error: Product");
  }

  if (colourCollectionExists === false) {
    !invalidProducts[id] ? (invalidProducts[id] = []) : "";
    invalidProducts[id].push("Collection error: Colour");
  }
};

const createCollectionsProduct = (name) => {
  stringProduct += `
  { "input": { "title": "Product: ${name}", "ruleSet": { "appliedDisjunctively": true, "rules": {  "column": "TITLE", "condition": "${name}", "relation": "STARTS_WITH" } } } }
  `;
};

const createCollectionsColour = (colour) => {
  stringColour += `
  { "input": { "title": "Colour: ${colour}", "ruleSet": { "appliedDisjunctively": true, "rules": {  "column": "TITLE", "condition": "${colour}", "relation": "ENDS_WITH" } } } }
  `;
};

const PRODUCTS_1 = gql`
  query products {
    products(first: 100) {
      edges {
        cursor
        node {
          title
          handle
          options(first: 2) {
            name
          }
          collections(first: 5) {
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

const PRODUCTS_2 = gql`
  query products {
    products(
      first: 100
      after: "eyJsYXN0X2lkIjo3MTU3OTQzMzM3MTUyLCJsYXN0X3ZhbHVlIjoiNzE1Nzk0MzMzNzE1MiJ9"
    ) {
      edges {
        cursor
        node {
          title
          handle
          options(first: 2) {
            name
          }
          collections(first: 5) {
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

const PRODUCTS_3 = gql`
  query products {
    products(
      first: 100
      after: "eyJsYXN0X2lkIjo3MTU3OTUwOTcyMDk2LCJsYXN0X3ZhbHVlIjoiNzE1Nzk1MDk3MjA5NiJ9"
    ) {
      edges {
        cursor
        node {
          title
          handle
          options(first: 2) {
            name
          }
          collections(first: 5) {
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

const ProductQuery = () => {
  const { loading, data } = useQuery(PRODUCTS_3);

  if (loading) return <p>Loading products..</p>;

  const loopedProducts = [];
  const loopedColours = [];

  data.products.edges.map((product) => {
    let title = product.node.title;
    let name = title.split(" - ")[0];
    let colour = title.split(" - ")[1];

    // validateTitle(title);
    // validateHandle(product, title);
    // ValidateOptions(product, title);
    // validateCollections(product, title, name, colour)

    if (!loopedProducts.includes(name)) {
      createCollectionsProduct(name);
      loopedProducts.push(name);
    }

    if (!loopedColours.includes(colour)) {
      createCollectionsColour(colour);
      loopedColours.push(colour);
    }
  });

  return (
    <div>
      <p>{stringProduct}</p>
      <p>{stringColour}</p>
    </div>
  );

  // return  (
  //   <div>
  //     <pre>
  //       {JSON.stringify(invalidProducts, null, 2) }
  //     </pre>
  //   </div>
  // );
};

export function CollectionString() {
  return <ProductQuery />;
}
