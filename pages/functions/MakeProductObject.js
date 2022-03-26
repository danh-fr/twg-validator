const MakeProductObject = (faultyProducts, parent, child, grandchild) => {
  !faultyProducts[parent] ? (faultyProducts[parent] = {}) : "";

  if (child) {
    !faultyProducts[parent][child] ? (faultyProducts[parent][child] = {}) : "";
  }

  if (grandchild) {
    !faultyProducts[parent][child][grandchild]
      ? (faultyProducts[parent][child][grandchild] = {})
      : "";
  }
};

export default MakeProductObject;
