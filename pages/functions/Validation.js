import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";
import ValidateCollections from "../functions/ValidateCollections";

const Validation = (invalidProducts, data) => {
  data.products.edges.map((product) => {
    let title = product.node.title;

    ValidateTitle(invalidProducts, title);
    ValidateHandle(invalidProducts, product, title);
    ValidateOptions(invalidProducts, product, title);
    ValidateCollections(invalidProducts, product, title);
  });
};

export default Validation;
