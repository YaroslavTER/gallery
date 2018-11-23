class Menu {
  constructor() {
    this._history = [];
    this._prevTopMenu = null;
    this._menuElementClassName = {
      topMenu: "top-level-menu",
      parent: "parent",
      icon: {
        more: "more-icon",
        arrow: "arrow-icon"
      },
      subMenu: "sub-menu-click"
    };
    this.separator = {
      dash: "-",
      colon: ":"
    };
  }

  getMenuElement(target) {
    if (target.className.includes(this._menuElementClassName.parent)) {
      return target.firstElementChild;
    } else if (
      target.className.includes(this._menuElementClassName.icon.arrow) ||
      target.className.includes(this._menuElementClassName.icon.more)
    ) {
      return target;
    }
  }

  getSubMenu(menuElement) {
    if (menuElement.className.includes(this._menuElementClassName.subMenu)) {
      return menuElement;
    } else if (
      menuElement.nextElementSibling.className.includes(
        this._menuElementClassName.subMenu
      )
    ) {
      return menuElement.nextElementSibling;
    }
  }

  getSubMenuLevel(subMenu) {
    if (subMenu.id) {
      return Number(
        subMenu.id.split(this.separator.dash)[1].split(this.separator.colon)[1]
      );
    } else {
      return null;
    }
  }

  addToHistory(subMenu) {
    const subMenuLevel = this.getSubMenuLevel(subMenu);
    const filteredArray = this._history.filter(element => {
      return element.id === subMenu.id && element.id.split(this.separator.dash);
    });
    if (subMenuLevel !== 0 && filteredArray.length === 0) {
      this._history.push(subMenu);
    }
  }

  removeFromHistory(subMenu) {
    const removeIndex = this._history.indexOf(subMenu);
    const subMenuLevel = this.getSubMenuLevel(subMenu);
    if (subMenuLevel !== 0) {
      this._history.splice(removeIndex, 1);
    }
  }

  hideAllSubMenus() {
    this._history.forEach(element => Display.hide(element));
    [].concat(history).forEach(element => this.removeFromHistory(element));
  }

  showMenuElement(subMenu) {
    const subMenuLevel = this.getSubMenuLevel(subMenu);
    if (subMenuLevel === 0) {
      if (this._prevTopMenu === null) {
        Display.show(subMenu);
        this._prevTopMenu = subMenu;
      } else if (this._prevTopMenu !== null) {
        Display.hide(this._prevTopMenu);
        this.hideAllSubMenus();
        this._prevTopMenu = null;
        Display.show(subMenu);
        this._prevTopMenu = subMenu;
      }
    } else if (subMenuLevel > 0) {
      Display.show(subMenu);
    }
  }

  hideMenuElement(subMenu) {
    Display.hide(subMenu);
    if (subMenu.className.includes(this._menuElementClassName.subMenu)) {
      this.hideAllSubMenus();
      this.removeFromHistory(subMenu);
    }
    if (
      subMenu.parentElement.className.includes(
        this._menuElementClassName.topMenu
      )
    ) {
      this.hideAllSubMenus();
    }
  }

  handleMenu(target) {
    let menuElement = this.getMenuElement(target);
    if (menuElement) {
      let subMenu = this.getSubMenu(menuElement);
      this.addToHistory(subMenu);
      if (subMenu.style.display === "" || subMenu.style.display === "none") {
        this.showMenuElement(subMenu);
      } else if (subMenu.style.display === "grid") {
        this.hideMenuElement(subMenu);
      }
    } else {
      if (this._history.length > 0) {
        this.hideAllSubMenus();
      }
    }
  }
}
