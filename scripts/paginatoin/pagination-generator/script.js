class PaginationGenerator extends CustomDOMGenerator {
  static generatePosts(postList, currentPage) {
    this.generateElements(
      postList.map((post, index) => {
        const postIndex = (currentPage - 1) * 10 + index;
        return {
          name: "article",
          attributes: [
            { name: "class", value: "post" },
            { name: "id", value: `post-${postIndex}` }
          ],
          style: `#post-${postIndex} {
                  background-image: url("${post.image.url}");
                }`,
          childList: [
            {
              name: "div",
              attributes: [{ name: "class", value: "like-wrapper" }],
              childList: [
                {
                  name: "div",
                  childList: [
                    {
                      name: "img",
                      attributes: [
                        { name: "class", value: "like-icon post-like-click" },
                        { name: "src", value: "./icons/social/like/like.svg" },
                        { name: "alt", value: "like" }
                      ]
                    },
                    {
                      name: "div",
                      isParent: true,
                      attributes: [
                        { name: "class", value: "likes-number post-like-click" }
                      ],
                      childList: [{ text: post.like.counter, isParent: true }]
                    }
                  ]
                }
              ]
            },
            {
              name: "div",
              attributes: [{ name: "class", value: "user-wrapper" }],
              childList: [
                {
                  name: "div",
                  attributes: [{ name: "class", value: "user" }],
                  childList: [
                    {
                      name: "div",
                      attributes: [{ name: "class", value: "user-image" }],
                      childList: [
                        {
                          name: "img",
                          attributes: [
                            { name: "src", value: post.user.image.src }
                          ]
                        }
                      ]
                    },
                    {
                      name: "div",
                      attributes: [{ name: "class", value: "user-name" }],
                      childList: [
                        {
                          text: `${post.user.name}${index}${currentPage}`,
                          isParent: true
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "div",
                  attributes: [{ name: "class", value: "share" }],
                  childList: [
                    {
                      name: "img",
                      attributes: [
                        { name: "class", value: "share-icon" },
                        {
                          name: "src",
                          value: "./icons/social/share/white-share.svg"
                        },
                        { name: "alt", value: "share" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        };
      }),
      "posts-target-gen"
    );
  }

  static generatePaginationElements(numeration, currentPage) {
    this.generateElements(
      [
        {
          name: "button",
          attributes: [{ name: "id", value: "pg-first-page" }],
          childList: [
            {
              name: "img",
              attributes: [
                { name: "src", value: "./icons/arrows/first.svg" },
                { name: "alt", value: "first" },
                { name: "id", value: "operapg-first-page" }
              ]
            }
          ]
        },
        {
          name: "button",
          isParent: true,
          attributes: [{ name: "id", value: "pg-previous-page" }],
          childList: [
            {
              name: "img",
              attributes: [
                { name: "src", value: "./icons/arrows/left-arrow.svg" },
                { name: "alt", value: "previous" },
                { name: "id", value: "operapg-previous-page" }
              ]
            }
          ]
        }
      ]
        .concat(
          numeration.map(number => {
            const isCurrentPage = number === currentPage;
            return {
              name: "button",
              attributes: [
                {
                  name: "class",
                  value: "page-number" + (isCurrentPage ? " current-page" : "")
                },
                { name: "id", value: `pg-number:${number}-page` }
              ],
              childList: [{ text: number, isParent: true }]
            };
          })
        )
        .concat([
          {
            name: "button",
            attributes: [{ name: "id", value: "pg-next-page" }],
            childList: [
              {
                name: "img",
                attributes: [
                  { name: "src", value: "./icons/arrows/right-arrow.svg" },
                  { name: "alt", value: "next" },
                  { name: "id", value: "operapg-next-page" }
                ]
              }
            ]
          },
          {
            name: "button",
            isParent: true,
            attributes: [{ name: "id", value: "pg-last-page" }],
            childList: [
              {
                name: "img",
                attributes: [
                  { name: "src", value: "./icons/arrows/last.svg" },
                  { name: "alt", value: "last" },
                  { name: "id", value: "operapg-last-page" }
                ]
              }
            ]
          }
        ]),
      "pg-target-gen"
    );
  }
}
