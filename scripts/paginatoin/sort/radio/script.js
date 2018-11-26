class Radio {
  constructor() {}

  static getSiblingsByTagName(tagName, element) {
    let radioSibling = element.firstElementChild;
    let siblingList = [];
    do {
      if (radioSibling.tagName.toLowerCase() === tagName) {
        siblingList.push(radioSibling);
      }
      radioSibling = radioSibling.nextElementSibling;
    } while (radioSibling !== null);
    return siblingList;
  }

  getCheckedRadioButton() {
    const siblingList = Radio.getSiblingsByTagName(
      "input",
      [...document.getElementsByClassName("sort")].pop()
    );
    const checkedRadioButton = siblingList
      .filter(button => button.checked)
      .pop();
    return checkedRadioButton;
  }
}
