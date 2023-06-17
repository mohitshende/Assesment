import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations($tenant: String!) {
    locationList(tenant: $tenant) {
      pages
      resources {
        name
        address
        status
        tenant
        updatedAt
        id
      }
    }
  }
`;
