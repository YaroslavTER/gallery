class EventAction {
  constructor() {}

  applyAction(element, elementEvent, wrapper) {
    element.addEventListener(elementEvent, event => {
      const target = event.target;
      wrapper(target);
    });
  }

  setDisplayOnElementEvent(DOMElement, elementEvent, wrapper) {
    if (DOMElement instanceof Array) {
      [...DOMElement].forEach(element => {
        this.applyAction(element, elementEvent, wrapper);
      });
    } else {
      this.applyAction(DOMElement, elementEvent, wrapper);
    }
  }
}
