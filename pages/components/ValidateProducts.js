import React from "react";
import { gql, useQuery } from "@apollo/client";

import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";
import ValidateCollections from "../functions/ValidateCollections";

const productsData = {};
const invalidProducts = {};

const PRODUCTS_GQL = gql`
  query ProductsGql($count: Int, $cursor: String) {
    products(first: $count, after: $cursor) {
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
          collections(first: 15) {
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

const GetProducts = () => {
  const { loading, error, data, extensions, fetchMore } = useQuery(
    PRODUCTS_GQL,
    {
      variables: {
        count: 1,
        cursor: null,
      },
    }
  );

  if (error) console.log("Error: ", error.message);
  if (error) return <p>Error: {error.message}</p>;
  if (loading || !data) return <p>Loading products..</p>;

  productsData = data;

  let items = productsData.products.edges.length;

  if (data.products.pageInfo.hasNextPage || !error) {
    console.log("Fetching again, starting timer..");

    setTimeout(() => {
      console.log("Fetching..");

      fetchMore({
        variables: {
          count: 25,
          cursor: data.products.edges[data.products.edges.length - 1].cursor,
        },
      });
    }, 10000);
  }

  // setInterval(() => {
  //   console.log('in interval')
  //   if (data.products.pageInfo.hasNextPage) {
  //     console.log('fetching again')
  //     fetchMore({
  //       variables: {
  //         cursor:
  //           data.products.edges[data.products.edges.length - 1].cursor,
  //       },
  //     });
  //   }
  // }, 10000)

  // if (!data.products.pageInfo.hasNextPage || error) {
  //   console.log('stopping fetch')
  //   clearInterval(fetchAgain)
  // }

  return (
    <div>
      <p>Items: {items}</p>
      <pre>{JSON.stringify(productsData, null, 2)}</pre>
    </div>
  );
};

const DisplayResponse = () => {
  // return GetProduct("gid://shopify/Product/7157932589248");
  return GetProducts();
};

export function ValidateProducts() {
  return <DisplayResponse />;
}

// data.products.edges.map((product) => {
//   let title = product.node.title;

//   ValidateTitle(invalidProducts, title);
//   ValidateHandle(invalidProducts, product, title);
//   ValidateOptions(invalidProducts, product, title);
//   ValidateCollections(invalidProducts, product, title);

// });
