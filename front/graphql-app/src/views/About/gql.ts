import { gql } from "@apollo/client";

export const ABOUT_QUERY = gql`
  query GetAllAbout($skip: Int, $take: Int, $filter: Int) {
    getAllAbout(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const ABOUT_UPDATE = gql`
  mutation updateAbout($updateAboutData: AboutUpdateInput!) {
    updateAbout(data: $updateAboutData) {
    }
  }
`;
