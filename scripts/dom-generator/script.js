class CustomDOMGenerator {
  constructor() {}

  appendChildStyle(createdElement, element) {
    let css = document.createElement("style");
    css.type = "text/css";
    let style = element.style;

    if (css.styleSheet) {
      css.styleSheet.cssText = style;
    } else {
      css.appendChild(document.createTextNode(style));
    }

    createdElement.appendChild(css);
  }

  generateElement(element, parent) {
    let createdElement = element.name
      ? document.createElement(element.name)
      : null;
    if (element.text && !element.isParent) {
      let text = document.createTextNode(element.text);
      createdElement.appendChild(text);
    } else if (element.text && element.isParent) {
      let text = document.createTextNode(element.text);
      parent.appendChild(text);
    }
    if (element.attributes) {
      element.attributes.forEach(attribute => {
        createdElement.setAttribute(attribute.name, attribute.value);
      });
    }
    if (element.childList) {
      element.childList.forEach(childElement => {
        this.generateElement(childElement, createdElement);
      });
    }
    if (createdElement) {
      if (element.style) {
        this.appendChildStyle(createdElement, element);
      }
      parent.appendChild(createdElement);
    }
  }

  generateElements(elementList, targetId) {
    elementList.forEach(button => {
      this.generateElement(button, document.getElementById(targetId));
    });
  }

  removeAllChildElements(id) {
    const domElement = document.getElementById(id);
    while (domElement.firstElementChild) {
      domElement.removeChild(domElement.firstElementChild);
    }
  }
}
