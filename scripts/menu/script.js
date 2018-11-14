function Menu() {
  let history = [];
  let prevTopMenu = null;

  const getMenuElement = target => {
    let menuElement = null;
    if (target.className.includes("parent")) {
      menuElement = target.firstElementChild;
    } else if (
      target.className.includes("arrow-icon") ||
      target.className.includes("more-icon")
    ) {
      menuElement = target;
    }
    return menuElement;
  };

  const getSubMenu = menuElement => {
    if (menuElement.className.includes("sub-menu-click")) {
      subMenu = menuElement;
    } else if (
      menuElement.nextElementSibling.className.includes("sub-menu-click")
    ) {
      subMenu = menuElement.nextElementSibling;
    }
    return subMenu;
  };

  const getSubMenuLevel = subMenu =>
    Number(subMenu.id.split("-")[1].split(":")[1]);

  const addToHistory = subMenu => {
    const subMenuLevel = getSubMenuLevel(subMenu);
    const filteredArray = history.filter(element => {
      return element.id === subMenu.id && element.id.split("-");
    });
    if (subMenuLevel !== 0 && filteredArray.length === 0) {
      history.push(subMenu);
    }
  };

  const removeFromHistory = subMenu => {
    const removeIndex = history.indexOf(subMenu);
    const subMenuLevel = getSubMenuLevel(subMenu);
    if (subMenuLevel !== 0) {
      history.splice(removeIndex, 1);
    }
  };

  const hideAllSubMenus = () => {
    history.forEach(element => Display.hide(element));
    [].concat(history).forEach(element => removeFromHistory(element));
  };

  this.handleMenu = target => {
    let menuElement = getMenuElement(target);
    if (menuElement) {
      let subMenu = getSubMenu(menuElement);
      addToHistory(subMenu);

      if (subMenu.style.display === "" || subMenu.style.display === "none") {
        const subMenuLevel = getSubMenuLevel(subMenu);
        if (subMenuLevel === 0) {
          if (prevTopMenu === null) {
            Display.show(subMenu);
            prevTopMenu = subMenu;
          } else if (prevTopMenu !== null) {
            hideAllSubMenus();
            Display.hide(prevTopMenu);
            prevTopMenu = null;
            Display.show(subMenu);
            prevTopMenu = subMenu;
          }
        } else if (subMenuLevel > 0) {
          Display.show(subMenu);
        }
      } else if (subMenu.style.display === "grid") {
        Display.hide(subMenu);
        if (subMenu.className.includes("sub-menu-click")) {
          hideAllSubMenus();
          removeFromHistory(subMenu);
        }
        if (subMenu.parentElement.className.includes("top-level-menu")) {
          hideAllSubMenus();
        }
      }
    }
  };
}
