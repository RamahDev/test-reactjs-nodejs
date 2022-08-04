import { gql } from "@apollo/client";

export const BLOGS_QUERY = gql`
  query GetAllBlogs($skip: Int, $take: Int, $filter: Int) {
    getAllBlogs(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const BLOGS_UPDATE = gql`
  mutation updateBlogs($updateBlogsData: BlogsUpdateInput!) {
    updateBlogs(data: $updateBlogsData) {
    }
  }
`;
