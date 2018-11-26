class PageSelectorGenerator {
  constructor() {}

  appedVideoInHeader(videoTargetGen) {
    CustomDOMGenerator.generateElement(
      {
        name: "video",
        attributes: [
          { name: "autoplay" },
          { name: "controls" },
          { name: "muted" },
          { name: "loop" }
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
          }
        ]
      },
      document.getElementById(videoTargetGen)
    );
  }
}