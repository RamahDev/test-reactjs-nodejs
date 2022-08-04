import { gql } from "@apollo/client";

export const PRODUIT_QUERY = gql`
  query GetAllProduit($skip: Int, $take: Int, $filter: Int) {
    getAllProduit(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const PRODUIT_ADD = gql`
  mutation addProduit($addboutData: ProduitAddInput!) {
    addProduit(data: $addProduitData) {
    }
  }
`;

export const PRODUIT_UPDATE = gql`
  mutation updateProduit($updateProduitData: ProduitUpdateInput!) {
    updateProduit(data: $updateProduitData) {
    }
  }
`;
