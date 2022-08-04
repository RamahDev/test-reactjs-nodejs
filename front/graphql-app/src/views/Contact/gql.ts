import { gql } from "@apollo/client";

export const CONTACT_QUERY = gql`
  query GetAllContact($skip: Int, $take: Int, $filter: Int) {
    getAllContact(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const CONTACT_UPDATE = gql`
  mutation updateContact($updateContactData: ContactUpdateInput!) {
    updateContact(data: $updateContactData) {
    }
  }
`;
