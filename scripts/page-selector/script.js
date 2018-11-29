class PageSelector extends PageSelectorGenerator {
  constructor(defaultPage) {
    super();
    this._previousPage = defaultPage;
    this._interval = null;
  }

  changeHeader(pageName) {
    const videoTargetGen = "video-target-gen";
    const slider = new Slider();
    switch (pageName) {
      case "about-us":
        this._interval = slider.autoSwitching(mainSlides);
        CustomDOMGenerator.removeAllChildElements(videoTargetGen);
        this.appedVideoInHeader(videoTargetGen);
        break;
      case "browse":
        if (this._interval) {
          slider.stopInterval(this._interval);
          this._interval = null;
        }
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
