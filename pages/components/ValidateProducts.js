import React from "react";
import { gql, InMemoryCache, useQuery } from "@apollo/client";

import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";
import ValidateCollections from "../functions/ValidateCollections";

const invalidProducts = {};

const PRODUCT_GQL = gql`
  query ProductGql($id: ID!) {
    product(id: $id) {
      title
      totalInventory
    }
  }
`;

const PRODUCTS_GQL = gql`
  query ProductsGql($numProducts: Int!, $cursor: String) {
    products(first: $numProducts, after: $cursor) {
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

const GetProduct = (id) => {
  const { loading, error, data } = useQuery(PRODUCT_GQL, {
    variables: { id },
  });

  if (loading) return <p>Loading products..</p>;
  if (error) console.log("Error: ", error.message);

  return (
    <>
      <p>{data.product.title}</p>
      <p>{data.product.totalInventory}</p>
    </>
  );
};

const GetAllProducts = () => {
  const { loading, error, data, fetchMore } = useQuery(PRODUCTS_GQL, {
    variables: {
      numProducts: 10,
    },
  });

  if (loading) return <p>Loading products..</p>;
  if (error) console.log("Error: ", error.message);

  data.products.edges.map((product) => {
    let title = product.node.title;

    ValidateTitle(invalidProducts, title);
    ValidateHandle(invalidProducts, product, title);
    ValidateOptions(invalidProducts, product, title);
    ValidateCollections(invalidProducts, product, title);
  });

  return (
    <div>
      <pre>{JSON.stringify(invalidProducts, null, 2)}</pre>
    </div>
  );
};

const DisplayResponse = () => {
  // return GetProduct("gid://shopify/Product/7157932589248");
  return GetAllProducts();
};

export function ValidateProducts() {
  return <DisplayResponse />;
}
