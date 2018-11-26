const pageSelector = new PageSelector(document.getElementById("page.browse"));
const eventAction = new EventAction();
const menu = new Menu();
const itemsPerPage = 10;
const modalWindow = new ModalWindow(itemsPerPage);
const pagination = new Pagination(postList, itemsPerPage, 4);
const sort = new Sort();
const event = "click";
let currentPage = 1;
let changedPostList = postList;

window.onload = () => {
  eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("inline-menu"),
      document.getElementById("breadcrumbs")
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
      pagination.postList = changedPostList;
      console.log(pagination._postList);
      currentPage = pagination.handlePagination(target);
    }
  );

  eventAction.setDisplayOnElementEvent(
    ...document.getElementsByClassName("sort"),
    event,
    target => {
      changedPostList = sort.handleSort(currentPage, target);
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
};
