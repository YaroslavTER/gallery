class ModalWindowGenerator {
  static generateModalWindow(post, targetGen) {
    let childList = [
      {
        name: "div",
        attributes: [{ name: "class", value: "content-image" }],
        childList: [
          {
            name: "img",
            attributes: [
              { name: "src", value: post.image.url },
              { name: "alt", value: "" }
            ]
          }
        ]
      },
      {
        name: "div",
        attributes: [{ name: "class", value: "social-wrapper" }],
        childList: [
          {
            name: "div",
            attributes: [{ name: "class", value: "like-wrapper" }],
            childList: [
              {
                name: "div",
                attributes: [{ name: "class", value: "like" }],
                childList: [
                  {
                    name: "img",
                    attributes: [
                      { name: "class", value: "like-click" },
                      {
                        name: "src",
                        value: "./icons/social/like/like.svg"
                      },
                      { name: "alt", value: "" }
                    ]
                  },
                  {
                    name: "div",
                    text: post.like.counter.toString(),
                    attributes: [{ name: "class", value: "number like-click" }]
                  }
                ]
              }
            ]
          },
          {
            name: "div",
            attributes: [{ name: "class", value: "share-button share" }],
            childList: [
              {
                name: "div",
                childList: [
                  {
                    name: "img",
                    attributes: [
                      {
                        name: "src",
                        value: "./icons/social/share/black-share.svg"
                      },
                      {
                        name: "alt",
                        value: "share"
                      }
                    ]
                  },
                  {
                    name: "div",
                    text: "share"
                  }
                ]
              }
            ]
          },
          {
            name: "div",
            attributes: [{ name: "class", value: "share-button download" }],
            childList: [
              {
                name: "div",
                childList: [
                  {
                    name: "img",
                    attributes: [
                      {
                        name: "src",
                        value: "./icons/modal/download-arrow.svg"
                      },
                      {
                        name: "alt",
                        value: "share"
                      }
                    ]
                  },
                  {
                    name: "div",
                    text: "download"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
    if (post.tagList.length) {
      childList = childList.concat({
        name: "div",
        attributes: [{ name: "class", value: "modal-footer" }],
        childList: [
          {
            name: "div",
            attributes: [{ name: "class", value: "tag-wrapper" }],
            childList: [
              {
                name: "h2",
                text: "Tags"
              },
              {
                name: "div",
                attributes: [{ name: "class", value: "tag-list" }],
                childList: post.tagList.map(tag => ({
                  name: "div",
                  text: tag.name,
                  attributes: [{ name: "class", value: "tag" }]
                }))
              }
            ]
          }
        ]
      });
    }

    CustomDOMGenerator.generateElement(
      {
        name: "div",
        style: `body { 
                  overflow: hidden
                }`,
        attributes: [{ name: "class", value: "modal-window" }],
        childList: [
          {
            name: "header",
            childList: [
              {
                name: "div",
                attributes: [{ name: "class", value: "user-wrapper" }],
                childList: [
                  {
                    name: "div",
                    attributes: [
                      { name: "class", value: "user" },
                      { name: "id", value: `modal-${post.id}` }
                    ],
                    childList: [
                      {
                        name: "div",
                        attributes: [{ name: "class", value: "user-image" }],
                        style: `
                            .modal-window #modal-${post.id} .user-image {
                              background-image: url("${post.user.image.src}");
                            }
                          `
                      },
                      {
                        name: "div",
                        text: post.user.name,
                        attributes: [{ name: "class", value: "user-name" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "div",
                attributes: [{ name: "class", value: "close-wrapper" }],
                childList: [
                  {
                    name: "img",
                    attributes: [
                      { name: "class", value: "close" },
                      { name: "src", value: "./icons/modal/close.svg" },
                      { name: "alt", value: "close" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "div",
            attributes: [{ name: "class", value: "modal-content" }],
            childList: [
              {
                name: "div",
                attributes: [{ name: "class", value: "content-wrapper" }],
                childList: childList
              }
            ]
          }
        ]
      },
      document.getElementById(targetGen)
    );
  }
}
