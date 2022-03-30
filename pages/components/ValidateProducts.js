import React from "react";
import { Card, Subheading, TextContainer } from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";
import Validation from "../functions/Validation";

var invalidProducts = {};
const numProducts = 20;
const fetchCount = 20;
const fetchInterval = 200;
const validationComplete = false;

const PRODUCTS_GQL = gql`
  query ProductsGql($count: Int, $cursor: String) {
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
  if (loading || !data) return <p>Loading products...</p>;

  let cursor = data.products.edges[data.products.edges.length - 1].cursor;
  let items = data.products.edges.length;
  let hasNextPage = data.products.pageInfo.hasNextPage;

  if (hasNextPage && items <= numProducts) {
    console.log("Fetching again, starting timer..");

    setTimeout(() => {
      console.log("Fetching..");

      fetchMore({
        variables: {
          count: fetchCount,
          cursor: cursor,
        },
      });
    }, fetchInterval);
  } else if (items >= numProducts || !hasNextPage) {
    console.log("Fetch complete. Running validation..");
    Validation(invalidProducts, data);
    validationComplete = true;
  }

  if (validationComplete) {
    const cards = [];

    for (const invalidEntry of Object.entries(invalidProducts)) {
      const title = invalidEntry[0];
      const id = invalidEntry[1][1];
      const errors = invalidEntry[1].errors;

      for (const errorEntry of Object.entries(errors)) {
        const error = errorEntry[0];

        for (const item of Object.entries(errorEntry[1])) {
          const expected = item[0];
          const received = item[1];

          cards.push(
            <Card key={id} title={title} sectioned>
              <Subheading>{error}</Subheading>
              <TextContainer spacing="loose">
                <p>
                  Expected: {expected}
                  <br />
                  Received: {received}
                </p>
                <p></p>
              </TextContainer>
            </Card>
          );
        }
      }
    }

    return (
      <>
        {cards}
        <pre>{JSON.stringify(invalidProducts, null, 2)}</pre>
      </>
    );

    // return <pre>{JSON.stringify(invalidProducts, null, 2)}</pre>;
  } else {
    return <p>Loading products...</p>;
  }
};

export function ValidateProducts() {
  return <GetProducts />;
}

{
  /*  */
}

{
  /* <Card title="Online store dashboard" sectioned>
  <p>View a summary of your online store’s performance.</p>
</Card>  */
}
