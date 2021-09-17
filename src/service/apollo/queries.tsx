import gql from "graphql-tag";
import { PostFragment } from "./fragments";

export const GET_POSTS = gql`
  query GetPostsWithFilters($filter: PostFilter) {
    allPosts(filter: $filter) {
      ...PostItem
    }
  }
  ${PostFragment.post}
`;
