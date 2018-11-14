class Display {
  static hide(element) {
    return (element.style.display = "none");
  }
  static show(element) {
    return (element.style.display = "grid");
  }
}
