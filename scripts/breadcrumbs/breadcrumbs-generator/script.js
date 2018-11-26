class BreadcrumbsGenerator {
  constructor() {}

  generateBreadcrumbs(targetGen, path) {
    CustomDOMGenerator.generateElements(
      path.map((pathItem, index) => {
        let pathElement = null;
        if (index < path.length - 1) {
          pathElement = {
            name: "button",
            attributes: [{ name: "class", value: "empty-button" }],
            childList: [
              { name: "h1", text: pathItem },
              {
                name: "img",
                isParent: true,
                attributes: [
                  { name: "class", value: "right-arrow" },
                  {
                    name: "src",
                    value: "./icons/arrows/right-arrow.svg"
                  },
                  { name: "alt", value: "right-arrow" }
                ]
              }
            ]
          };
        } else if (index < path.length) {
          pathElement = { name: "h1", text: pathItem };
        }
        return pathElement;
      }),
      targetGen
    );
  }
}
