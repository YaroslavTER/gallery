function Visibility() {
  const setDisplayToElement = (className, displayValue) => {
    const classArray = document.getElementsByClassName(className);
    [...classArray].forEach(element => (element.style.display = displayValue));
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
