class Slider extends SliderGenerator {
  constructor() {
    super();
  }

  autoSwitching(slides) {
    const targetGen = "slide-target-gen";
    const length = slides.length;
    const intervalSeconds = 7;
    let counter = 0;
    let index = 0;
    return setInterval(() => {
      index = counter % length;
      CustomDOMGenerator.removeAllChildElements(targetGen);
      this.generateSlider(slides[index].url, targetGen);
      counter++;
    }, intervalSeconds * 1000);
  }

  stopInterval(interval) {
    clearInterval(interval);
  }
}
