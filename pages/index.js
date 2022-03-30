import { Page, Heading } from "@shopify/polaris";
import { ValidateProducts } from "./components/ValidateProducts";

export default function Index() {
  return (
    <Page>
      <Heading>
        The Wolf Gang Product Validator
        <span role="img" aria-label="tada emoji">
          🎉
        </span>
      </Heading>
      <ValidateProducts />
    </Page>
  );
}
