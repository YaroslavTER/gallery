function EventAction() {
  this.setDisplayOnElementEvent = (elements, elementEvent, actionList) => {
    actionList.forEach(action => {
      [...elements].forEach(element => {
        element.addEventListener(elementEvent, event => {
          const target = event.target;
          action(target);
        });
      });
    });
  };
}
