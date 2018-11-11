function Visibility() {
  const setDisplayToElement = (className, displayValue) => {
    const modalStyles = document.getElementsByClassName(className);
    [...modalStyles].forEach(element => {
      element.style.display = displayValue;
    });
  };

  const setDisplayOnElementEvent = (
    elements,
    elementEvent,
    className,
    display
  ) => {
    [...elements].forEach(element => {
      element.addEventListener(elementEvent, event => {
        const target = event.target;
        const attributes = target.attributes;
        if (attributes.class.value === className) {
          setDisplayToElement(display.setValueTo, display.value);
        }
      });
    });
  };

  this.apply = array => {
    array.forEach(element => {
      const domElement = document.getElementsByClassName(
        element.domElementClass
      );
      setDisplayOnElementEvent(domElement, element.event, element.className, {
        setValueTo: element.displayValue.setValueTo,
        value: element.displayValue.value
      });
    });
  };
}

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
  }
]);
