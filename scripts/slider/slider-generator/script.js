class SliderGenerator {
  constructor() {}

  generateSlider(url, targetGen) {
    CustomDOMGenerator.generateElement(
      {
        name: "img",
        attributes: [
          { name: "class", value: "slide" },
          { name: "src", value: url },
          { name: "alt", value: "slide" }
        ]
      },
      document.getElementById(targetGen)
    );
  }
}

/* 
<img
  class="slide"
  src="./images/blocks/annie-spratt-294450-unsplash.jpg"
  alt="slide"
/>
*/
