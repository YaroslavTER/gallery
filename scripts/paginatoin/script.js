class Pagination {
  constructor(posts, itemsPerPage, offset) {
    this._posts = posts;
    this._itemsPerPage = itemsPerPage;
    this._offset = offset;
    this._buttonList = [];
    this._length = 10;
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

    const numeration = this.getArray(leftOffset)
      .map(element => currentPage - element)
      .reverse()
      .concat([currentPage])
      .concat(this.getArray(rightOffset).map(element => currentPage + element));

    return numeration;
  }

  generateElements(numeration) {
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
        numeration.map((number, index) => {
          if (Math.round((numeration.length - 1) / 2) == index) {
            return {
              name: "button",
              attributes: [
                { name: "class", value: "page-number current-page" }
              ],
              childList: [{ text: number, isParent: true }]
            };
          } else {
            return {
              name: "button",
              attributes: [{ name: "class", value: "page-number" }],
              childList: [{ text: number, isParent: true }]
            };
          }
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

    //const paginationSection = document.getElementById("pg-target-gen");
  }

  removeAllChildElements(domElement) {
    while (domElement.firstElementChild) {
      domElement.removeChild(domElement.firstElementChild);
    }
  }

  handlePagination(target) {
    this.generateElements(this.calculate(3));
  }
}
