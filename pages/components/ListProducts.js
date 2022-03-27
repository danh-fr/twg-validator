import React from "react";
import { gql, useQuery } from "@apollo/client";

const PRODUCTS_GQL = gql`
  query ProductsGql($cursor: String) {
    products(first: 100, after: $cursor) {
      edges {
        cursor
        node {
          id
          title
          handle
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const ListProducts = () => {
  const { data, error, loading, fetchMore } = useQuery(PRODUCTS_GQL);

  if (error) return <p>Error: {error.message}</p>;
  if (loading || !data) return <p>Loading..</p>;

  return (
    <>
      <button
        onClick={() => {
          fetchMore({
            variables: {
              cursor:
                data.products.edges[data.products.edges.length - 1].cursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              let combinedData = {
                products: {
                  pageInfo: { ...fetchMoreResult.products.pageInfo },
                  edges: [
                    ...previousResult.products.edges,
                    ...fetchMoreResult.products.edges,
                  ],
                  __typename: fetchMoreResult.products.__typename,
                },
              };
              console.log(fetchMoreResult.products.pageInfo.hasNextPage);
              return combinedData;
            },
          });
        }}
      >
        Load more
      </button>
      <div>
        {data.products.edges.map((product) => (
          <p key={product.node.id}>{product.node.title}</p>
        ))}
      </div>
    </>
  );
};

export default ListProducts;
