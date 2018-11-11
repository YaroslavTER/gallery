const Visibility = new Visibility();

Visibility.apply([
  {
    domElementClass: "posts-wrapper",
    event: "click",
    className: "post",
    displayValue: { setValueTo: "modal-wrapper", value: "grid" }
  },
  {
    domElementClass: "close",
    event: "click",
    className: "close",
    displayValue: { setValueTo: "modal-wrapper", value: "none" }
  },
  {
    domElementClass: "modal-wrapper",
    event: "click",
    className: "modal-wrapper",
    displayValue: { setValueTo: "modal-wrapper", value: "none" }
  }
]);
