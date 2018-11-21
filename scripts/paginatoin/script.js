class Pagination {
  constructor(posts, itemsPerPage, offset) {
    this._posts = posts;
    this._itemsPerPage = itemsPerPage;
    this._currentPage = null;
    this._offset = offset;
    this._buttonList = [];
    this._length = posts.length;
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
    const isOffsetToBig = currentPage + this._offset >= this._length;
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
    this._currentPage = currentPage;
    const numeration = this.getArray(leftOffset)
      .map(element => currentPage - element)
      .reverse()
      .concat([currentPage])
      .concat(this.getArray(rightOffset).map(element => currentPage + element));

    return numeration;
  }

  generatePaginationElements(numeration) {
    let buttonList = [
      {
        name: "button",
        attributes: [{ name: "id", value: "pg-first-page" }],
        childList: [
          {
            name: "img",
            attributes: [
              { name: "src", value: "./icons/arrows/first.svg" },
              { name: "alt", value: "first" }
            ]
          }
        ]
      },
      {
        name: "button",
        isParent: true,
        attributes: [{ name: "id", value: "pg-previous-page" }],
        childList: [
          {
            name: "img",
            attributes: [
              { name: "src", value: "./icons/arrows/left-arrow.svg" },
              { name: "alt", value: "previous" }
            ]
          }
        ]
      }
    ]
      .concat(
        numeration.map(number => {
          const isCurrentPage = number === this._currentPage;
          return {
            name: "button",
            attributes: [
              {
                name: "class",
                value: "page-number" + (isCurrentPage ? " current-page" : "")
              },
              { name: "id", value: `pg-number:${number}-page` }
            ],
            childList: [{ text: number, isParent: true }]
          };
        })
      )
      .concat([
        {
          name: "button",
          attributes: [{ name: "id", value: "pg-next-page" }],
          childList: [
            {
              name: "img",
              attributes: [
                { name: "src", value: "./icons/arrows/right-arrow.svg" },
                { name: "alt", value: "first" }
              ]
            }
          ]
        },
        {
          name: "button",
          isParent: true,
          attributes: [{ name: "id", value: "pg-last-page" }],
          childList: [
            {
              name: "img",
              attributes: [
                { name: "src", value: "./icons/arrows/last.svg" },
                { name: "alt", value: "previous" }
              ]
            }
          ]
        }
      ]);
    buttonList.forEach(button => {
      CustomDOMGenerator.generateElement(
        button,
        document.getElementById("pg-target-gen")
      );
    });
  }

  removeAllChildElements(id) {
    const domElement = document.getElementById(id);
    while (domElement.firstElementChild) {
      domElement.removeChild(domElement.firstElementChild);
    }
  }

  handleNumber(identifier) {
    const number = Number(identifier.split(":")[1]);
    this.goToPage(number);
  }

  getPostsForRender(currentPage) {
    return this._posts.slice(
      currentPage - 1,
      currentPage + this._itemsPerPage - 1
    );
  }

  goToPage(currentPage) {
    this.removeAllChildElements("pg-target-gen");
    this.generatePaginationElements(this.calculate(currentPage));
    const pagePostList = this.getPostsForRender(currentPage);
    this.removeAllChildElements("posts-target-gen");
    this.generatePosts(pagePostList);
  }

  generatePosts(postList) {
    console.log(this._currentPage, postList.length);
    const domPostList = postList
      .map((post, index) => ({
        name: "article",
        attributes: [
          { name: "class", value: "post" },
          { name: "id", value: `post-${index}` }
        ],
        childList: [
          {
            name: "div",
            attributes: [{ name: "class", value: "like-wrapper" }],
            childList: [
              {
                name: "div",
                childList: [
                  {
                    name: "img",
                    attributes: [
                      { name: "class", value: "like-icon" },
                      { name: "src", value: "./icons/social/like/like.svg" },
                      { name: "alt", value: "like" }
                    ]
                  },
                  {
                    name: "div",
                    isParent: true,
                    attributes: [{ name: "class", value: "likes-number" }],
                    childList: [{ text: post.like.counter, isParent: true }]
                  }
                ]
              }
            ]
          },
          {
            name: "div",
            attributes: [{ name: "class", value: "user-wrapper" }],
            childList: [
              {
                name: "div",
                attributes: [{ name: "class", value: "user" }],
                childList: [
                  {
                    name: "div",
                    attributes: [{ name: "class", value: "user-image" }],
                    childList: [
                      {
                        name: "img",
                        attributes: [
                          { name: "src", value: post.user.image.src }
                        ]
                      }
                    ]
                  },
                  {
                    name: "div",
                    attributes: [{ name: "class", value: "user-name" }],
                    childList: [
                      {
                        text: `${post.user.name}${index}${this._currentPage}`,
                        isParent: true
                      }
                    ]
                  }
                ]
              },
              {
                name: "div",
                attributes: [{ name: "class", value: "share" }],
                childList: [
                  {
                    name: "img",
                    attributes: [
                      { name: "class", value: "share-icon" },
                      {
                        name: "src",
                        value: "./icons/social/share/white-share.svg"
                      },
                      { name: "alt", value: "share" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }))
      .reverse();
    domPostList.forEach(button => {
      CustomDOMGenerator.generateElement(
        button,
        document.getElementById("posts-target-gen")
      );
    });
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
  /*
  generate(currentPage) {
    
    this.generatePaginationElements(this.calculate(currentPage));
  }*/
}
