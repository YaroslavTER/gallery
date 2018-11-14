function ModalWindow() {
  const applyAction = (className, action) => {
    const elements = document.getElementsByClassName(className);
    [...elements].forEach(element => {
      action(element);
    });
  };

  const showModalWindow = className => {
    applyAction(className, Display.show);
  };

  const hideModalWindow = className => {
    applyAction(className, Display.hide);
  };

  this.handleModalWindow = target => {
    const modalWrapperClassName = "modal-wrapper";
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
  };
}
