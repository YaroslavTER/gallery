class Breadcrumbs extends BreadcrumbsGenerator {
  constructor() {
    super();
    this._path = [];
  }

  addMenuItem(textContent) {
    let menuItemName = /\w+\s?\w+/gi.exec(textContent);
    if (menuItemName) {
      this._path.push(menuItemName.pop());
    }
  }

  handleBreadcrums(target) {
    if (target.className.includes("select")) {
      let currentElement = target;
      this._path = null;
      this._path = [];
      while (
        currentElement &&
        !currentElement.className.includes("top-level-menu")
      ) {
        //classList
        if (currentElement.tagName.toLowerCase() === "li") {
          this.addMenuItem(currentElement.firstChild.textContent);
        }
        currentElement = currentElement.parentElement;
      }
      if (!currentElement) {
        this._path = ["Home"];
      } else {
        this.addMenuItem(currentElement.firstChild.textContent);
        if (this._path[0] === "Home") {
          this._path = this._path.reverse();
        } else {
          this._path = ["Home"].concat(this._path.reverse());
        }
      }
      const targetGen = "path-target-gen";
      CustomDOMGenerator.removeAllChildElements(targetGen);
      this.generateBreadcrumbs(targetGen, this._path);
    }
  }
}
