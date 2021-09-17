import gql from "graphql-tag";
import { PostFragment } from "./fragments";

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $description: String!
    $authorId: String!
    $votes: JSON!
  ) {
    createPost(
      title: $title
      description: $description
      authorId: $authorId
      votes: $votes
    ) {
      ...PostItem
    }
  }
  ${PostFragment.post}
`;

export const MUTATE_POST = gql`
  mutation MutatePost(
    $id: ID!
    $title: String!
    $description: String!
    $authorId: String!
    $votes: JSON!
  ) {
    updatePost(
      id: $id
      title: $title
      description: $description
      authorId: $authorId
      votes: $votes
    ) {
      ...PostItem
    }
  }
  ${PostFragment.post}
`;

export const DELETE_POSTS_BY_IDS = gql`
  mutation DeletePostsByIds($id: ID!) {
    removePost(id: $id) {
      ...PostItem
    }
  }
  ${PostFragment.post}
`;

export const MUTATE_VOTE = gql`
  mutation MutateVote($id: ID! $votes: JSON!) {
    updatePost(id: $id votes: $votes) {
      votes
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($request: SignUpRequest!) {
    signup(request: $request) {
      error
      user {
        id
        email
        authProvider
      }
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($request: LoginRequest!) {
    login(request: $request) {
      error
      user {
        id
        email
        authProvider
      }
      token
    }
  }
`;
