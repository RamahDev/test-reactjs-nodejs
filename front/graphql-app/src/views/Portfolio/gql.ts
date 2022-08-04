import { gql } from "@apollo/client";

export const PORTFOLIO_QUERY = gql`
  query GetAllPortfolio($skip: Int, $take: Int, $filter: Int) {
    getAllPortfolio(skip: $skip, take: $take, filter: $filter) {
    }
  }
`;

export const PORTFOLIO_UPDATE = gql`
  mutation updatePortfolio($updatePortfolioData: PortfolioUpdateInput!) {
    updatePortfolio(data: $updatePortfolioData) {
    }
  }
`;
