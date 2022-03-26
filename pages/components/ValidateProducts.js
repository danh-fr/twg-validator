import React from "react";
import { gql, useQuery } from "@apollo/client";

import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";
import ValidateCollections from "../functions/ValidateCollections";

var faultyProducts = {};

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

    ValidateTitle(faultyProducts, title);
    ValidateHandle(faultyProducts, product, title);
    ValidateOptions(faultyProducts, product, title);
    ValidateCollections(faultyProducts, product, title);
  });

  console.log(data);

  return (
    <div>
      <pre>{JSON.stringify(faultyProducts, null, 2)}</pre>
    </div>
  );
};

export function ValidateProducts() {
  return <ProductList />;
}
