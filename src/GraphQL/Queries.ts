import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations($tenant: String!, $page: Int, $limit: Int) {
    locationList(tenant: $tenant, page: $page, limit: $limit) {
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

export const GET_LOCATION = gql`
  query LocationRead($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
        address
        alias
        description
        id
        managingOrganization
        name
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
      }
    }
  }
`;
