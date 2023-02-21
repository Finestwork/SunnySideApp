export default class PositionHelper {
  // Calculate the top position of targetRef in relation to the height of siblingRef.
  static caclcTopFromSibling(siblingRef, targetRef, offset = 0) {
    if (
      Node.ELEMENT_NODE !== siblingRef.nodeType &&
      Node.ELEMENT_NODE !== targetRef.nodeType
    )
      return;

    const HEIGHT = siblingRef.getBoundingClientRect().height;

    Object.assign(targetRef.style, {
      top: `${HEIGHT + offset}px`,
    });
  }
}
