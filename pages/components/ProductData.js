import React from "react";
import { gql, useQuery } from "@apollo/client";

const fetchLimit = 50;
const fetchCount = 25;

const PRODUCTS = gql`
  query products($count: Int, $cursor: String) {
    products(first: $count, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
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

const FetchProducts = () => {
  const { loading, error, data, fetchMore } = useQuery(PRODUCTS, {
    variables: {
      count: 1,
      cursor: null,
    },
  });

  if (error) return <p>Error: {error.message}</p>;
  if (loading || !data) return <p>Loading products..</p>;

  let cursor = data.products.edges[data.products.edges.length - 1].cursor;
  let items = data.products.edges.length;
  let hasNextPage = data.products.pageInfo.hasNextPage;

  if (hasNextPage && items <= fetchLimit) {
    console.log("Fetching again, starting timer..");

    setTimeout(() => {
      console.log("Fetching..");

      fetchMore({
        variables: {
          count: fetchCount,
          cursor: cursor,
        },
      });
    }, 10000);
  } else if (items >= fetchLimit) {
    console.log("Reached fetch limit");
  } else if (!hasNextPage) {
    console.log("Fetched all products in store.");
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export function ProductData() {
  return <FetchProducts />;
}
