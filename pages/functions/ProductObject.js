const ProductObject = (invalidProducts, parent, child, grandchild) => {
  !invalidProducts[parent] ? (invalidProducts[parent] = {}) : "";

  if (child) {
    !invalidProducts[parent][child]
      ? (invalidProducts[parent][child] = {})
      : "";
  }

  if (grandchild) {
    !invalidProducts[parent][child][grandchild]
      ? (invalidProducts[parent][child][grandchild] = {})
      : "";
  }
};

export default ProductObject;
