class Filter {
  constructor(postList) {
    this._postList = postList;
  }

  set postList(value) {
    this._postList = value;
  }

  filterPosts(tagname) {
    if (tagname === "all") {
      return this._postList;
    }
    return this._postList.filter(
      post => post.tagList.filter(tag => tag.name === tagname).length
    );
  }

  handleFilter(text) {
    return this.filterPosts(text);
  }
}
