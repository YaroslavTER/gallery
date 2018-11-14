const eventAction = new EventAction();
const menu = new Menu();
const modalWindow = new ModalWindow();
const event = "click";
eventAction.setDisplayOnElementEvent(
  document.getElementsByClassName("inline-menu"),
  event,
  [menu.handleMenu]
);
eventAction.setDisplayOnElementEvent(
  document.getElementsByClassName("posts-wrapper"),
  event,
  [modalWindow.handleModalWindow]
);
