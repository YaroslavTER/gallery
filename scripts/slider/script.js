class Slider extends SliderGenerator {
  constructor(slides) {
    super();
    this._slides = slides;
    this._prevSlide = null;
  }

  showCurrentSlide(index) {
    const currentSlide = this._slides[index];
    currentSlide.index = index;
    if (this._prevSlide) {
      Display.hide(document.getElementById(`slide-${this._prevSlide.index}`));
    }
    Display.show(document.getElementById(`slide-${index}`), "block");
    this._prevSlide = currentSlide;
  }

  autoSwitching() {
    const targetGen = "slide-target-gen";
    const length = this._slides.length;
    const intervalSeconds = 7;
    let counter = 1;
    let index = 1;
    CustomDOMGenerator.removeAllChildElements(targetGen);
    this.generateSlides(this._slides, targetGen);
    this.showCurrentSlide(index - 1);
    return setInterval(() => {
      index = counter % length;
      this.showCurrentSlide(index);
      counter++;
    }, intervalSeconds * 1000);
  }

  stopInterval(interval) {
    clearInterval(interval);
  }
}
