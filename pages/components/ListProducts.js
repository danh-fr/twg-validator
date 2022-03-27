import React from "react";
import { gql, useQuery, InMemoryCache } from "@apollo/client";

const PRODUCTS_GQL = gql`
  query ProductsGql($cursor: String) {
    products(first: 5, after: $cursor) {
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
  const { data, error, loading, fetchMore } = useQuery(PRODUCTS_GQL, {
    variables: { cursor: null },
  });

  if (error) return <p>Error: {error.message}</p>;
  if (loading || !data) return <p>Loading..</p>;

  const pageInfo = data.products.pageInfo;

  return (
    <>
      <button
        onClick={() => {
          if (pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                cursor:
                  data.products.edges[data.products.edges.length - 1].cursor,
              },
            });
          }
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

// onClick={() => {
//   fetchMore({
//     variables: {
//       cursor:
//         data.products.edges[data.products.edges.length - 1].cursor
//     },
//   });
// }}
