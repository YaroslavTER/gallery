class CustomDOMGenerator {
  static generateElement(element, parent) {
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
      element.attributes.forEach(function(attribute) {
        createdElement.setAttribute(attribute.name, attribute.value);
      });
    }
    if (element.childList) {
      element.childList.forEach(function(childElement) {
        CustomDOMGenerator.generateElement(childElement, createdElement);
      });
    }
    if (createdElement) {
      parent.appendChild(createdElement);
    }
  }
}
