class PageSelector extends PageSelectorGenerator {
  constructor(defaultPage) {
    super();
    this._previousPage = defaultPage;
  }

  changeHeader(pageName) {
    const videoTargetGen = "video-target-gen";
    switch (pageName) {
      case "about-us":
        CustomDOMGenerator.removeAllChildElements(videoTargetGen);
        this.appedVideoInHeader(videoTargetGen);
        break;
      case "browse":
        CustomDOMGenerator.removeAllChildElements(videoTargetGen);
        break;
    }
  }

  showPageById(id) {
    const page = document.getElementById(id);
    if (page) {
      const pageName = page.id.split("_").pop();
      this.changeHeader(pageName);
      if (this._previousPage) {
        Display.hide(this._previousPage);
      }
      Display.show(page, "grid");
      this._previousPage = page;
    }
  }

  handleSelectedPage(target) {
    const className = target.className;
    if (className.includes("select")) {
      const pageName = className.split(":").pop();
      this.showPageById(`page_${pageName}`);
      return this._previousPage;
    }
    return null;
  }
}
