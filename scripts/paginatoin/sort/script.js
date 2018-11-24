class Sort {
  constructor() {}

  handleSort(currentPage, target) {
    let sortedPosts = null;
    switch (target.id) {
      case "new":
        /*sortedPosts = postList.sort((a, b) => a.like.counter < b.like.counter);
        CustomDOMGenerator.removeAllChildElements("posts-target-gen");
        PaginationGenerator.generatePosts(sortedPosts, currentPage);*/
        break;
      case "trending":
        break;
    }
  }
}
