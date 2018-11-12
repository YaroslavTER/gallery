function Visibility() {
  //let history = [];
  let prevElement = null;

  const setDisplayToElement = (className, displayValue) => {
    const classArray = document.getElementsByClassName(className);
    [...classArray].forEach(element => (element.style.display = displayValue));
  };

  const setDisplayOnElementEvent = (
    elements,
    elementEvent,
    className,
    display
  ) => {
    [...elements].forEach(element => {
      element.addEventListener(elementEvent, event => {
        const target = event.target;
        const attributes = target.attributes;
        /*if (attributes.class.value === className) {
          setDisplayToElement(display.setValueTo, display.value);
        }*/

        /* menu */

        let menuElement = null;
        if (target.className.includes("parent")) {
          menuElement = target.firstElementChild;
        } else if (
          target.className.includes("arrow-icon") ||
          target.className.includes("more-icon")
        ) {
          menuElement = target;
        }

        let subMenu = null;
        let flag = false;

        if (menuElement.className.includes("sub-menu-click")) {
          subMenu = menuElement;
        } else if (
          menuElement.nextElementSibling.className.includes("sub-menu-click")
        ) {
          subMenu = menuElement.nextElementSibling;
        }
        if (subMenu.style.display === "" || subMenu.style.display === "none") {
          subMenu.style.display = "grid";
        } else if (subMenu.style.display === "grid") {
          subMenu.style.display = "none";
        }
        prevElement = menuElement;

        /* !menu */
      });
    });
  };

  this.apply = array => {
    array.forEach(element => {
      const domElement = document.getElementsByClassName(
        element.domElementClass
      );
      setDisplayOnElementEvent(domElement, element.event, element.className, {
        setValueTo: element.displayValue.setValueTo,
        value: element.displayValue.value
      });
    });
  };
}
