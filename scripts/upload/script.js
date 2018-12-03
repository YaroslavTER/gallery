class Upload {
  constructor(postList) {
    this._postList = postList;
  }

  set postList(value) {
    this._postList = value;
  }

  get postList() {
    return this._postList;
  }

  getTagsFromLine(line) {
    const list = line.split(",").map(tag => {
      const handledTag = tag ? tag.replace(/^\s*/g, "") : "";
      if (handledTag !== "") {
        return {
          name: handledTag
        };
      }
    });
    return list;
  }

  isTagListValid(taglist) {
    let isValid = true;
    taglist.forEach(tag => {
      if (!tag) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleUpload() {
    const inputUrl = document.getElementById("img-url");
    const inputTags = document.getElementById("tags").value;
    if (inputUrl.validity.valid && inputUrl.value !== "") {
      const tags = this.getTagsFromLine(inputTags);
      return this._postList.concat([
        {
          image: {
            url: inputUrl.value
          },
          id: `post-${filter.handleFilter("all").length}`,
          user: {
            name: "Incognito",
            image: {
              src: "./images/users/incognito.jpg"
            }
          },
          share: {
            link: "#"
          },
          like: {
            isPressed: false,
            counter: "0"
          },
          tagList: this.isTagListValid(tags) ? tags : []
        }
      ]);
    }
  }
}
