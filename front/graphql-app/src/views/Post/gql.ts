import { gql } from "@apollo/client";

export const POST_QUERY = gql`
  query GetAllPost($skip: Int, $take: Int, $filter: Int) {
    getAllPost(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const POST_UPDATE = gql`
  mutation updatePost($updatePostData: PostUpdateInput!) {
    updatePost(data: $updatePostData) {
    }
  }
`;
