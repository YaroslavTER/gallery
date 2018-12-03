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

  sortBy(postList, currentPage, compare) {
    return this.sortPostList(postList, currentPage, compare);
  }

  handleSort(currentPage, target, postList) {
    switch (target.id) {
      case "new":
        return this.sortBy(
          postList,
          currentPage,
          (a, b) => this.getIdNumber(a.id) < this.getIdNumber(b.id)
        );
      case "trending":
        return this.sortBy(
          postList,
          currentPage,
          (a, b) => a.like.counter < b.like.counter
        );
    }
    return postList;
  }
}
