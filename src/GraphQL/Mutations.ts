import { gql } from "@apollo/client";

export const CREATE_LOCATION = gql`
  mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      resourceID
    }
  }
`;
