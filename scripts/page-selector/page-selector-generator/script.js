class PageSelectorGenerator {
  constructor() {}

  appedVideoInHeader(videoTargetGen) {
    CustomDOMGenerator.generateElements(
      [
        {
          name: "video",
          style: `body > header { 
                    background-image: none;
                  }
                  
                  #video-target-gen {
                    z-index: -1;
                  }`,
          attributes: [
            { name: "autoplay", value: "" },
            { name: "controls", value: "" },
            { name: "muted", value: "" },
            { name: "loop", value: "" }
          ],
          childList: [
            {
              name: "source",
              attributes: [
                {
                  name: "src",
                  value:
                    "./video/WorkSpace-FreeHDStockFootage(NoCopyright)----Business,Technology,OfficeMeeting.mp4"
                },
                { name: "type", value: "video/mp4" }
              ]
            },
            {
              name: "source",
              attributes: [
                {
                  name: "src",
                  value:
                    "./video/WorkSpace-FreeHDStockFootage(NoCopyright)----Business,Technology,OfficeMeeting.ogv"
                },
                { name: "type", value: "video/ogg" }
              ]
            }
          ]
        }
      ],
      videoTargetGen //document.getElementById(videoTargetGen)
    );
  }

  removeBackgroundImage() {
    CustomDOMGenerator.generateElement(
      {
        name: "div",
        style: `body > header {
                  background-image: url("../images/header/pexels-photo-167834.jpeg");
                }`
      },
      document.getElementById("video-target-gen")
    );
  }
}
