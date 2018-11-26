const eventAction = new EventAction();
const menu = new Menu();
const pageSelector = new PageSelector(document.getElementById("page_browse"));
const breadcrumbs = new Breadcrumbs();
const itemsPerPage = 10;
const modalWindow = new ModalWindow(itemsPerPage, mainPostList);
const pagination = new Pagination(mainPostList, itemsPerPage, 4);
const radio = new Radio();
const sort = new Sort();
const event = "click";
let currentPage = 1;
let changedPostList = JSON.parse(JSON.stringify(mainPostList));

window.onload = () => {
  changedPostList = sort.handleSort(
    currentPage,
    radio.getCheckedRadioButton(),
    changedPostList
  );

  eventAction.setDisplayOnElementEvent(
    [
      ...document.getElementsByClassName("inline-menu"),
      document.getElementById("breadcrumbs")
    ],
    event,
    target => {
      pageSelector.handleSelectedPage(target);
      breadcrumbs.handleBreadcrums(target);
    }
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
    target => {
      modalWindow.postList = changedPostList;
      modalWindow.handleModalWindow(target, currentPage, changedPostList);
    }
  );
};
