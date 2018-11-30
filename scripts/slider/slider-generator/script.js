class SliderGenerator {
  constructor() {}
  /* CustomDOMGenerator.generateElement(
      {
        name: "img",
        attributes: [
          {name: "id", value: `slide`},
          { name: "class", value: "slide" },
          { name: "src", value: url },
          { name: "alt", value: "slide" }
        ]
      },
      document.getElementById(targetGen)
    ); */
  generateSlides(urlList, targetGen) {
    CustomDOMGenerator.generateElements(
      urlList.map((slide, index) => {
        const slideId = `slide-${index}`;
        return {
          name: "img",
          style: `#${targetGen} #${slideId} {
                    display: none;
                  }`,
          attributes: [
            { name: "id", value: slideId },
            { name: "class", value: "slide" },
            { name: "src", value: slide.url },
            { name: "alt", value: "slide" }
          ]
        };
      }),
      targetGen
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
