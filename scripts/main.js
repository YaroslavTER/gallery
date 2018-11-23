const eventAction = new EventAction();
const menu = new Menu(); //chnage inline-menu display on inline-block
const itemsPerPage = 10;
const pagination = new Pagination(postList, itemsPerPage, 4);
const modalWindow = new ModalWindow(itemsPerPage, pagination);
const event = "click";

window.onload = () => {
  eventAction.setDisplayOnElementEvent(document, event, target =>
    menu.handleMenu(target)
  );

  pagination.goToPage(1);
  eventAction.setDisplayOnElementEvent(
    ...document.getElementsByClassName("pagination"),
    event,
    target => pagination.handlePagination(target)
  );

  eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("posts-wrapper"),
      ...document.getElementsByClassName("modal-wrapper")
    ],
    event,
    target => modalWindow.handleModalWindow(target)
  );
};
