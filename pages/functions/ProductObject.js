const ProductObject = (invalidProducts, id, parent, child, grandchild) => {
  !invalidProducts[id] ? (invalidProducts[id] = {}) : "";
  invalidProducts[id]["product"] = parent;

  if (child) {
    !invalidProducts[id][child] ? (invalidProducts[id][child] = {}) : "";
  }

  if (grandchild) {
    !invalidProducts[id][child][grandchild]
      ? (invalidProducts[id][child][grandchild] = {})
      : "";
  }
};

export default ProductObject;
