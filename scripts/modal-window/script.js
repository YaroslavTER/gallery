class ModalWindow extends ModalWindowGenerator {
  constructor(itemsPerPage, pagination) {
    super();
    this._itemsPerPage = itemsPerPage;
    this._pagination = pagination;
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
    this.generateModalWindow(this._post, this._targetGen);
    this.applyAction(className, Display.show);
  }

  hideModalWindow(className) {
    this.removeAllChildElements(this._targetGen);
    this.applyAction(className, Display.hide);
  }

  handleLike() {
    this._post.like.isPressed = !this._post.like.isPressed;
    if (this._post.like.isPressed) {
      this._post.like.counter++;
    } else if (!this._post.like.isPressed) {
      this._post.like.counter--;
    }
    const postId = this._post.id;
    let postNumber = Number(postId.split("-").pop());
    const currentPage = parseInt(
      postNumber === 0 ? 1 : postNumber / this._itemsPerPage
    );

    //postList[postNumber] = JSON.parse(JSON.stringify(this._post));
    postList.splice(postNumber, 1, this._post);
    this._post = postList.filter(element => element.id === postId).pop();
    this.removeAllChildElements(this._targetGen);
    this.generateModalWindow(this._post, this._targetGen);
    /* this.removeAllChildElements("posts-target-gen");
    this.generatePosts(postList.concat([]), 1);*/
  }

  handleModalWindow(target) {
    const modalWrapperClassName = "modal-wrapper";
    if (target) {
      if (target.className.includes("like-click")) {
        this.handleLike();
      }
      switch (target.className) {
        case "post":
          this._post = postList
            .filter(element => element.id === target.id)
            .pop();
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
  }
}
