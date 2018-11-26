class Sort {
  constructor() {}

  sortPostList(postList, currentPage, action) {
    const sortedPosts = postList.sort(action);

    const postsPerPage = 10;
    const chunkForRender = Pagination.getPostsForRender(
      currentPage,
      postsPerPage,
      sortedPosts
    );
    CustomDOMGenerator.removeAllChildElements("posts-target-gen");
    PaginationGenerator.generatePosts(chunkForRender, currentPage);
    return sortedPosts;
  }

  getIdNumber(id) {
    return Number(id.split("-").pop());
  }

  handleSort(currentPage, target) {
    let changedPostList = null;
    switch (target.id) {
      case "new":
        changedPostList = this.sortPostList(
          mainPostList,
          currentPage,
          (a, b) => this.getIdNumber(a.id) > this.getIdNumber(b.id)
        );
        break;
      case "trending":
        changedPostList = this.sortPostList(
          mainPostList,
          currentPage,
          (a, b) => a.like.counter < b.like.counter
        );
        break;
    }
    return changedPostList;
  }
}
