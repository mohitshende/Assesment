import { gql } from "@apollo/client";

export const CREATE_LOCATION = gql`
  mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      resourceID
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation LocationRemove($locationRemoveId: String!, $tenant: String!) {
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      resourceID
    }
  }
`;

export const PATCH_LOCATION = gql`
  mutation LocationPatch(
    $locationPatchId: String!
    $requestBody: LocationPatchInput!
    $tenant: String!
  ) {
    locationPatch(
      id: $locationPatchId
      requestBody: $requestBody
      tenant: $tenant
    ) {
      resourceID
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation LocationUpdate(
    $locationUpdateId: String!
    $requestBody: LocationWriteInput!
    $tenant: String!
  ) {
    locationUpdate(
      id: $locationUpdateId
      requestBody: $requestBody
      tenant: $tenant
    ) {
      resourceID
    }
  }
`;
