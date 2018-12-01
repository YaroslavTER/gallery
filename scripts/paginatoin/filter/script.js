class Filter {
  constructor(postList) {
    this._postList = postList;
  }

  filterPosts(tagname) {
    if (tagname === "all") {
      return this._postList;
    }
    return this._postList.filter(
      post => post.tagList.filter(tag => tag.name === tagname).length
    );
  }

  handleFilter(target) {
    return this.filterPosts(target.text);
  }
}
