const pageSelector = new PageSelector(document.getElementById("page.browse"));
const eventAction = new EventAction();
const menu = new Menu();
const itemsPerPage = 10;
const modalWindow = new ModalWindow(itemsPerPage);
const pagination = new Pagination(postList, itemsPerPage, 4);
const sort = new Sort();
const event = "click";
let currentPage = 1;

window.onload = () => {
  eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("inline-menu"),
      document.getElementById("bredcrums")
    ],
    event,
    target => pageSelector.handleSelectedPage(target)
  );

  eventAction.setDisplayOnElementEvent(document, event, target =>
    menu.handleMenu(target)
  );

  pagination.goToPage(currentPage);
  eventAction.setDisplayOnElementEvent(
    ...document.getElementsByClassName("pagination"),
    event,
    target => {
      currentPage = pagination.handlePagination(target);
    }
  );

  eventAction.setDisplayOnElementEvent(
    ...document.getElementsByClassName("sort"),
    event,
    target => {
      sort.handleSort(currentPage, target);
    }
  );

  eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("posts-wrapper"),
      ...document.getElementsByClassName("modal-wrapper")
    ],
    event,
    target => modalWindow.handleModalWindow(target)
  );

  /* eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("post")
    ],
    event,
    target => modalWindow.handleModalWindow(target)
  ); */
};
