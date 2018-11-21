class ModalWindow {
  constructor() {}

  applyAction(className, action) {
    const elements = document.getElementsByClassName(className);
    [...elements].forEach(element => {
      action(element);
    });
  }

  showModalWindow(className) {
    this.applyAction(className, Display.show);
  }

  hideModalWindow(className) {
    this.applyAction(className, Display.hide);
  }

  handleModalWindow(target) {
    const modalWrapperClassName = "modal-wrapper";
    if (target) {
      switch (target.className) {
        case "post":
          this.showModalWindow(modalWrapperClassName);
          break;
        case "close":
          this.hideModalWindow(modalWrapperClassName);
          break;
        case modalWrapperClassName:
          this.hideModalWindow(modalWrapperClassName);
          break;
      }
    }
  }

  handle(target) {
    console.log(target);
  }
}
