import ValidateTitle from "../functions/ValidateTitle";
import ValidateHandle from "../functions/ValidateHandle";
import ValidateOptions from "../functions/ValidateOptions";
import ValidateCollections from "../functions/ValidateCollections";

const Validation = (invalidProducts, data) => {
  data.products.edges.map((product) => {
    let id = product.node.id;
    let title = product.node.title;

    ValidateTitle(invalidProducts, id, title);
    ValidateHandle(invalidProducts, id, product, title);
    ValidateOptions(invalidProducts, id, product, title);
    ValidateCollections(invalidProducts, id, product, title);
  });
};

export default Validation;
