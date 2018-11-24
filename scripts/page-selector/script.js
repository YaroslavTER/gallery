class PageSelector {
  constructor(defaultPage = null) {
    this._previousPage = defaultPage;
  }

  showPageById(id) {
    const page = document.getElementById(id);
    if (page) {
      if (this._previousPage) {
        Display.hide(this._previousPage);
        this._previousPage = null;
      }
      Display.show(page);
      this._previousPage = page;
    }
  }

  handleSelectedPage(target) {
    const className = target.className;
    if (className.includes("select")) {
      const pageName = className.split(":").pop();
      this.showPageById(`page_${pageName}`);
    }
    return this._previousPage;
  }
}
