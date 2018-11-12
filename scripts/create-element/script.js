function Create() {
  this.createElement = (element, parent) => {
    let createdElement = element.name
      ? document.createElement(element.name)
      : null;
    if (element.text && !element.isParent) {
      let text = document.createTextNode(element.text);
      createdElement.appendChild(text);
    } else if (element.text && element.isParent) {
      let text = document.createTextNode(element.text);
      parent.appendChild(text);
    }
    if (element.attributes) {
      element.attributes.forEach(function(attribute) {
        createdElement.setAttribute(attribute.name, attribute.value);
      });
    }
    if (element.childList) {
      element.childList.forEach(function(childElement) {
        createElement(childElement, createdElement);
      });
    }
    if (createdElement) {
      parent.appendChild(createdElement);
    }
  };
}

const menu = [//add keys
  { name: "Homve" },
  {
    name: "Browse",
    isOpen: false,
    childList: [
      {
        name: "Popular",
        isOpen: false,
        childList: [
          { name: "Popular" },
          { name: "New" },
          { name: "Most Shared" }
        ]
      },
      {
        name: "New"
      },
      {
        name: "Most Shared"
      }
    ]
  },
  {
    name: "Upload"
  },
  {
    name: "More",
    isOpen: false,
    childList: [
      { name: "Login" },
      { name: "Sign Up" },
      {
        name: "Home",
        isOpen: false,
        childList: [
          {
            name: "Browse",
            isOpen: false,
            childList: [
              {
                name: "Popular",
                isOpen: false,
                childList: [
                  { name: "Popular" },
                  { name: "New" },
                  { name: "Most shared" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

function handleComments(inputComments) {
  return inputComments.map(function(comment) {
    return {
      name: "div",
      attributes: [
        {
          name: "class",
          value: "comment"
        }
      ],
      childList: [
        {
          name: "p",
          text: comment.body
        },
        {
          name: "div",
          attributes: [
            {
              name: "class",
              value: "commented-user"
            }
          ],
          childList: [
            {
              name: "p",
              text: comment.name
            },
            {
              name: "p",
              childList: [
                {
                  name: "i",
                  attributes: [{ name: "class", value: "fas fa-envelope" }]
                },
                {
                  text: " " + comment.email,
                  isParent: true
                }
              ]
            }
          ]
        }
      ]
    };
  });
}

let handledPosts = posts.map(function(post) {
  let postedUser = users
    .filter(function(user) {
      return user.id === post.userId;
    })
    .pop();
  let postComments = comments.filter(function(comment) {
    return post.id === comment.postId;
  });

  let handledComments = handleComments(postComments);

  return {
    name: "div",
    attributes: [{ name: "class", value: "post-wrapper" }],
    childList: [
      {
        name: "label",
        attributes: [
          { name: "for", value: post.id },
          { name: "class", value: "post-list" }
        ],
        childList: [
          {
            name: "div",
            attributes: [{ name: "class", value: "post" }],
            childList: [
              {
                name: "h4",
                text: post.title
              },
              {
                name: "p",
                text: post.body
              },
              {
                name: "div",
                attributes: [{ name: "class", value: "post-bottom-wrapper" }],
                childList: [
                  {
                    name: "p",
                    childList: [
                      {
                        name: "i",
                        attributes: [
                          { name: "class", value: "fas fa-comment-alt" }
                        ]
                      },
                      {
                        text: " " + postComments.length,
                        isParent: true
                      },
                      {
                        text: " comments",
                        isParent: true
                      }
                    ]
                  },
                  {
                    name: "a",
                    attributes: [
                      {
                        name: "href",
                        value: `https://twitter.com/intent/tweet?hashtags=blog&text=${
                          post.body
                        }`
                      },
                      {
                        name: "target",
                        value: "_blank"
                      }
                    ],
                    childList: [
                      {
                        name: "i",
                        attributes: [{ name: "class", value: "fab fa-twitter" }]
                      },
                      {
                        text: " tweet",
                        isParent: true
                      }
                    ]
                  },
                  {
                    name: "a",
                    attributes: [
                      {
                        name: "href",
                        value: `./user-list/index.html#${postedUser.id}`
                      },
                      {
                        name: "target",
                        value: "_blank"
                      }
                    ],
                    childList: [
                      {
                        name: "i",
                        attributes: [
                          { name: "class", value: "fas fa-user-astronaut" }
                        ]
                      },
                      {
                        text: postedUser.username,
                        isParent: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "input",
        attributes: [
          {
            name: "type",
            value: "checkbox"
          },
          {
            name: "id",
            value: post.id
          },
          {
            name: "role",
            value: "button"
          }
        ]
      },
      {
        name: "div",
        attributes: [
          {
            name: "class",
            value: "comment-list"
          }
        ],
        childList: handledComments
      }
    ]
  };
});
