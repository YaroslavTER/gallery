const eventAction = new EventAction();
const menu = new Menu();
const pageSelector = new PageSelector(document.getElementById("page_browse"));
const breadcrumbs = new Breadcrumbs();
const itemsPerPage = 10;
const filter = new Filter(mainPostList);
const modalWindow = new ModalWindow(itemsPerPage, mainPostList);
const pagination = new Pagination(mainPostList, itemsPerPage, 4);
const radio = new Radio();
const sort = new Sort(mainPostList);
const upload = new Upload(mainPostList);
const event = "click";
let currentPage = 1;
let changedPostList = JSON.parse(JSON.stringify(mainPostList));

window.onload = () => {
  const sortByCheckedButton = () => {
    changedPostList = sort.handleSort(
      currentPage,
      radio.getCheckedRadioButton(),
      changedPostList
    );
  };
  //changedPostList = pagination.goToPage(currentPage);
  changedPostList = filter.handleFilter("all");
  pagination.postList = changedPostList;
  pagination.goToPage(1);

  eventAction.setDisplayOnElementEvent(
    document.getElementById("submit"),
    event,
    () => {
      upload.postList = changedPostList;
      const newPostList = upload.handleUpload();
      if (newPostList) {
        sort.postList = newPostList;
        filter.postList = newPostList;
        pagination.postList = newPostList;
        changedPostList = filter.handleFilter("all");
        sortByCheckedButton();
        pagination.goToPage(1);
        pageSelector.showPageById("page_browse");
      }
    }
  );

  eventAction.setDisplayOnElementEvent(
    document.getElementById("search-button"),
    event,
    () => {
      const inputText = document.getElementById("search-input").value;
      if (inputText === "") {
        inputText = all;
      }
      changedPostList = filter.handleFilter(inputText);
      pagination.postList = changedPostList;

      pagination.goToPage(1);
      //sortByCheckedButton();
    }
  );

  eventAction.setDisplayOnElementEvent(
    ...document.getElementsByClassName("filter"),
    event,
    target => {
      if (target.tagName.toLowerCase() === "option") {
        changedPostList = filter.handleFilter(target.text);
        pagination.postList = changedPostList;
        pagination.goToPage(1);
        //sortByCheckedButton();
      }
    }
  );

  eventAction.setDisplayOnElementEvent(
    [
      document.getElementById("logo"),
      ...document.getElementsByClassName("inline-menu"),
      ...document.getElementsByClassName("burger"),
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
      changedPostList = filter.handleFilter("all");
      changedPostList = sort.handleSort(currentPage, target);
      pagination.goToPage(1);
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
