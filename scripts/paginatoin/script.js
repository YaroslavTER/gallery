class Pagination {
  constructor(postList, itemsPerPage, offset) {
    this._postList = postList;
    this._itemsPerPage = itemsPerPage;
    this._currentPage = null;
    this._offset = offset;
    this._buttonList = [];
    this._length = this.refreshLength(postList, itemsPerPage);
  }

  set postList(postList) {
    this._postList = postList;
  }

  set length(length) {
    this._length = length;
  }

  refreshLength(postList, itemsPerPage) {
    this.length = Math.ceil(postList.length / itemsPerPage);
  }

  changeOffsetIf(condition, action) {
    if (condition) {
      return action();
    } else {
      return this._offset;
    }
  }

  getLeftOffset(currentPage) {
    const isOffsetToBig = currentPage - this._offset <= 0;
    return this.changeOffsetIf(isOffsetToBig, () => {
      let counter = 0;
      while (currentPage - counter > 1) {
        counter++;
      }
      return counter;
    });
  }

  getRightOffset(currentPage) {
    const isOffsetToBig = this._offset >= this._length;
    return this.changeOffsetIf(isOffsetToBig, () => {
      let counter = 0;
      while (currentPage + counter < this._length) {
        counter++;
      }
      return counter;
    });
  }

  getArray(length) {
    return [...Array(length)].map((element, index) => (element = index + 1));
  }

  calculate(currentPage) {
    const leftOffset = this.getLeftOffset(currentPage);
    const rightOffset = this.getRightOffset(currentPage);
    let auxLeftOffset = 0;
    let auxRightOffset = 0;
    this.refreshLength(this._postList, this._itemsPerPage);
    if (
      leftOffset +
        this._offset -
        rightOffset +
        rightOffset +
        this._offset -
        leftOffset +
        1 <=
      this._length
    ) {
      auxLeftOffset = this._offset - rightOffset;
      auxRightOffset = this._offset - leftOffset;
    }
    this._currentPage = currentPage;
    const numeration = this.getArray(leftOffset + auxLeftOffset)
      .map(element => currentPage - element)
      .reverse()
      .concat([currentPage])
      .concat(
        this.getArray(rightOffset + auxRightOffset).map(
          element => currentPage + element
        )
      );
    return numeration;
  }

  handleNumber(identifier) {
    const number = Number(identifier.split(":")[1]);
    this.goToPage(number);
    return this._currentPage;
  }

  static getPostsForRender(currentPage, itemsPerPage, posts) {
    return posts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }

  goToPage(currentPage) {
    CustomDOMGenerator.removeAllChildElements("pg-target-gen");
    this.refreshLength(this._postList, this._itemsPerPage);
    PaginationGenerator.generatePaginationElements(
      this.calculate(currentPage),
      currentPage
    );
    const pagePostList = Pagination.getPostsForRender(
      currentPage,
      this._itemsPerPage,
      this._postList
    );
    CustomDOMGenerator.removeAllChildElements("posts-target-gen");
    PaginationGenerator.generatePosts(pagePostList, this._currentPage);
  }

  handleArrows(identifier) {
    this.refreshLength(this._postList, this._itemsPerPage);
    switch (identifier) {
      case "next":
        if (this._currentPage < this._length) {
          this.goToPage(++this._currentPage);
        }
        break;
      case "previous":
        if (this._currentPage > 1) {
          this.goToPage(--this._currentPage);
        }
        break;
      case "first":
        this.goToPage(1);
        break;
      case "last":
        this.goToPage(this._length);
        break;
      case modalWrapperClassName:
        this.hideModalWindow(modalWrapperClassName);
        break;
    }
    return this._currentPage;
  }

  handlePagination(target) {
    const identifier = target.id.split("-")[1];
    if (identifier.includes(":")) {
      return this.handleNumber(identifier);
    } else {
      return this.handleArrows(identifier);
    }
  }
}
