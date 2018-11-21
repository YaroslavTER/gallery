const eventAction = new EventAction();
const menu = new Menu();
const modalWindow = new ModalWindow();
const pagination = new Pagination(postList, 10, 4);
const event = "click";
/*
eventAction.setDisplayOnElementEvent(document, event, target =>
  menu.handleMenu(target)
);*/
window.onload = () => {
  eventAction.setDisplayOnElementEvent(
    document.getElementsByClassName("posts-wrapper"),
    event,
    target => modalWindow.handleModalWindow(target)
  );

  pagination.goToPage(3);
  eventAction.setDisplayOnElementEvent(
    document.getElementsByClassName("pagination"),
    event,
    target => pagination.handlePagination(target)
  );
};
