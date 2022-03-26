import * as React from "react";
import { gql, useQuery } from "@apollo/client";

import MakeProductObject from "../functions/MakeProductObject";
import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";

var faultyProducts = {};

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
    products(first: 25) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          title
          handle
          options(first: 2) {
            name
          }
          collections(first: 35) {
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

    ValidateTitle(faultyProducts, title);
    ValidateHandle(faultyProducts, product, title);
    ValidateOptions(faultyProducts, product, title);
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
