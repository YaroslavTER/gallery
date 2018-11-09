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
  [...elements].forEach(element =>
    element.addEventListener(elementEvent, event => {
      const target = event.target;
      const attributes = target.attributes;
      if (attributes.class.value === className) {
        setDisplayToElement(display.setValueTo, display.value);
      }
    })
  );
};

const postsWrapper = document.getElementsByClassName("posts-wrapper");
const close = document.getElementsByClassName("close");

setDisplayOnElementEvent(postsWrapper, "click", "post", {
  setValueTo: "modal-wrapper",
  value: "grid"
});
setDisplayOnElementEvent(close, "click", "close", {
  setValueTo: "modal-wrapper",
  value: "none"
});
