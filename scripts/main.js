const eventAction = new EventAction();
const menu = new Menu();
const modalWindow = new ModalWindow();
const pagination = new Pagination([], 10, 2);
const event = "click";
eventAction.setDisplayOnElementEvent(document, event, [
  { action: menu.handleMenu, _this: menu },
  modalWindow.handleModalWindow
]);
/*eventAction.setDisplayOnElementEvent(
  document.getElementsByClassName("modal-wrapper"),
  event,
  [modalWindow.handleModalWindow]
);
pagination.calculate(3);*/
