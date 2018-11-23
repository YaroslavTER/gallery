class Pagination extends PaginationGenerator {
  constructor(posts, itemsPerPage, offset) {
    super();
    this._posts = posts;
    this._itemsPerPage = itemsPerPage;
    this._currentPage = null;
    this._offset = offset;
    this._buttonList = [];
    this._length = Math.round(posts.length / this._itemsPerPage); //8;
    //фіксована кількість елементів
    //;
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

  /*
  << < 1* 2 3 4 5 6 7 > >>
  << < 1 2* 3 4 5 6 7 > >>
  << < 1 2 3* 4 5 6 7 > >>
  << < 1 2 3 4* 5 6 7 > >>
  << < 2 3 4 5* 6 7 8 > >>
  << < 3 4 5 6 7 8  > >>
  */
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
  }

  getPostsForRender(currentPage) {
    return this._posts.slice(
      (currentPage - 1) * this._itemsPerPage,
      currentPage * this._itemsPerPage
    );
  }

  goToPage(currentPage) {
    this.removeAllChildElements("pg-target-gen");
    this.generatePaginationElements(this.calculate(currentPage), currentPage);
    const pagePostList = this.getPostsForRender(currentPage);
    this.removeAllChildElements("posts-target-gen");
    this.generatePosts(pagePostList, this._currentPage);
  }

  removeAllChildElements(id) {
    const domElement = document.getElementById(id);
    while (domElement.firstElementChild) {
      domElement.removeChild(domElement.firstElementChild);
    }
  }

  /* class="share-icon"
          src="./icons/social/share/white-share.svg"
          alt="share" */

  /* 
  
  <article class="post" id="post-1">
    <div class="like-wrapper">

      <div>
        <img
          class="like-icon"
          src="./icons/social/like/like.svg"
          alt="like"
        />
        <div class="likes-number">4523</div>
      </div>

    </div>

    <div class="user-wrapper">
      <div class="user">

        <div class="user-image">
          <img
            src="https://shareville-media.s3.amazonaws.com/cache/41/2c/412cb688e429f372335f7527695b29b8.jpg"
            alt=""
          />
        </div>

        <div class="user-name">Twitch Kappa</div>
        
      </div>

      <div class="share">
        <img
          class="share-icon"
          src="./icons/social/share/white-share.svg"
          alt="share"
        />
      </div>

    </div>

  </article>
  
  */

  handleArrows(identifier) {
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
  }

  handlePagination(target) {
    const identifier = target.id.split("-")[1];
    if (identifier.includes(":")) {
      this.handleNumber(identifier);
    } else {
      this.handleArrows(identifier);
    }
  }
}
