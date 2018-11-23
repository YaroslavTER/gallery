class ModalWindow {
  constructor(itemsPerPage) {
    this._itemsPerPage = itemsPerPage;
    this._targetGen = "mw-target-gen";
    this._post = null;
  }

  applyAction(className, action) {
    const elements = document.getElementsByClassName(className);
    [...elements].forEach(element => {
      action(element);
    });
  }

  showModalWindow(className) {
    ModalWindowGenerator.generateModalWindow(this._post, this._targetGen);
    this.applyAction(className, Display.show);
  }

  hideModalWindow(className) {
    CustomDOMGenerator.removeAllChildElements(this._targetGen);
    this.applyAction(className, Display.hide);
  }

  likeOnClick() {
    this._post.like.isPressed = !this._post.like.isPressed;
    if (this._post.like.isPressed) {
      this._post.like.counter++;
    } else if (!this._post.like.isPressed) {
      this._post.like.counter--;
    }
  }

  handleLike() {
    this.likeOnClick();
    this.refreshModalWindow();
    this.refreshPosts();
  }

  refreshModalWindow() {
    CustomDOMGenerator.removeAllChildElements(this._targetGen);
    ModalWindowGenerator.generateModalWindow(this._post, this._targetGen);
  }

  refreshPosts() {
    const postId = this._post.id;
    let postNumber = Number(postId.split("-").pop());
    const currentPage = parseInt(postNumber / this._itemsPerPage) + 1;
    postList.splice(postNumber, 1, this._post);
    const pagePostList = Pagination.getPostsForRender(
      currentPage,
      this._itemsPerPage,
      postList
    );
    CustomDOMGenerator.removeAllChildElements("posts-target-gen");
    PaginationGenerator.generatePosts(pagePostList, currentPage);
  }

  getPost(post) {
    return postList.filter(element => element.id === post.id).pop();
  }

  getParentPost(target) {
    let parent = target;
    do {
      parent = parent.parentElement;
    } while (parent.className !== "post");
    return parent;
  }

  selectAction(target) {
    const modalWrapperClassName = "modal-wrapper";
    switch (target.className) {
      case "post":
        this._post = this.getPost(target);
        this.showModalWindow(modalWrapperClassName);
        break;
      case "tag":
        console.log("tag");
        break;
      case "share-click":
        break;
      case "download-click":
        break;
      case "close":
        this.hideModalWindow(modalWrapperClassName);
        break;
      case modalWrapperClassName:
        this.hideModalWindow(modalWrapperClassName);
        break;
    }
  }

  handleModalWindow(target) {
    if (target) {
      if (target.className.includes("like-click")) {
        if (target.className.includes("post-like-click")) {
          this._post = this.getPost(this.getParentPost(target));
          this.likeOnClick();
          this.refreshPosts();
        } else {
          this.handleLike();
        }
      }
      this.selectAction(target);
    }
  }
}
