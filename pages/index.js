import { Heading, Page } from "@shopify/polaris";
import { ValidateProducts } from "./components/ValidateProducts";
import ListProducts from "./components/ListProducts";

export default function Index() {
  return (
    <Page>
      <Heading>
        The Wolf Gang Product Validator
        <span role="img" aria-label="tada emoji">
          🎉
        </span>
      </Heading>
      <ListProducts />
    </Page>
  );
}
