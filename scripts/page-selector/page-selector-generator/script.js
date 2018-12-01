class PageSelectorGenerator {
  constructor() {}

  appedVideoInHeader(videoTargetGen) {
    CustomDOMGenerator.generateElements(
      [
        {
          name: "video",
          style: `body > header { 
                    max-height: 350px;
                    height: 100%;
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
}
