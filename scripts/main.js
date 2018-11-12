const visibility = new Visibility();

visibility.apply([
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
  },
  {
    domElementClass: "inline-menu",
    event: "click",
    className: "qwe",
    displayValue: { setValueTo: "modal-wrapper", value: "grid" }
  }
]);
