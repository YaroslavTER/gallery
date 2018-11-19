class ModalWindow {
  constructor() {}

  applyAction(className, action) {
    const elements = document.getElementsByClassName(className);
    [...elements].forEach(element => {
      action(element);
    });
  }
  showModalWindow(className) {
    applyAction(className, Display.show);
  }
  hideModalWindow(className) {
    applyAction(className, Display.hide);
  }

  handleModalWindow(target) {
    const modalWrapperClassName = "modal-wrapper";
    console.log(this, target);
    if (target) {
      switch (target.className) {
        case "post":
          showModalWindow(modalWrapperClassName);
          break;
        case "close":
          hideModalWindow(modalWrapperClassName);
          break;
        case modalWrapperClassName:
          hideModalWindow(modalWrapperClassName);
          break;
      }
    }
  }
}
