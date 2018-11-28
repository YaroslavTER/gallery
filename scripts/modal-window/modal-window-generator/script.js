class ModalWindowGenerator {
  static generateModalWindow(post, targetGen) {
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
                        text: post.user.name + post.id,
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
                childList: [
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
                                text: post.like.counter,
                                attributes: [
                                  { name: "class", value: "number like-click" }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: "div",
                        attributes: [
                          { name: "class", value: "share-button share" }
                        ],
                        childList: [
                          {
                            name: "div",
                            childList: [
                              {
                                name: "img",
                                attributes: [
                                  {
                                    name: "src",
                                    value:
                                      "./icons/social/share/black-share.svg"
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
                        attributes: [
                          { name: "class", value: "share-button download" }
                        ],
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
                  },
                  {
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
                  }
                ]
              }
            ]
          }
        ]
      },
      document.getElementById(targetGen)
    );
  }

  /*

  <div class="modal-window">
    <header>
      <div class="user-wrapper">
        <div class="user">
          <div class="user-image"></div>
          <div class="user-name">Till Lindemann</div>
        </div>
      </div>
      <div class="close-wrapper">
        <img src="./icons/modal/close.svg" class="close" alt="close" />
      </div>
    </header>
    <div class="modal-content">
      <div class="content-wrapper">
        <div class="content-image">
          <img src="./images/header/kaidi-guo.jpg" alt="" />
        </div>
        <div class="social-wrapper">
          <div class="like-wrapper">
            <div class="like">
              <img src="./icons/social/like/like.svg" alt="" />
            </div>
            <div class="number">123</div>
          </div>
          <div class="share-button share">
            <div>
              <img
                src="./icons/social/share/black-share.svg"
                alt="share"
              />
              <div>share</div>
            </div>
          </div>
          <div class="share-button download">
            <div>
              <img
                src="./icons/modal/download-arrow.svg"
                alt="download"
              />
              <div>download</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="tag-wrapper">
            <h2>Tags</h2>
            <div class="tag-list">
              <div class="tag">mountains</div>
              <div class="tag">nature</div>
              <div class="tag">snow</div>
              <div class="tag">sunset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  */
}
