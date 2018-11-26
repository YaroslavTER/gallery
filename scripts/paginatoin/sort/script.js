class Sort {
  constructor() {}

  sortPostList(postList, currentPage, action) {
    const sortedPosts = postList.sort(action);
    const postsPerPage = 10;
    const chunkForSort = Pagination.getPostsForRender(
      currentPage,
      postsPerPage,
      sortedPosts
    );
    CustomDOMGenerator.removeAllChildElements("posts-target-gen");
    PaginationGenerator.generatePosts(chunkForSort, currentPage);
    return sortedPosts;
  }

  handleSort(currentPage, target) {
    let changedPostList = null;
    switch (target.id) {
      case "new":
        changedPostList = this.sortPostList(
          postList,
          currentPage,
          (a, b) => a.id > b.id
        );
        break;
      case "trending":
        changedPostList = this.sortPostList(
          postList,
          currentPage,
          (a, b) => a.like.counter < b.like.counter
        );
        break;
    }
    return changedPostList;
  }
}
