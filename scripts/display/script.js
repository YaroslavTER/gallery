class Display {
  static hide(element) {
    return (element.style.display = "none");
  }
  static show(element, displayValue) {
    return (element.style.display = displayValue);
  }
}
