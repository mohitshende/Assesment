import { useEffect, useState } from "react";
import { GET_LOCATION } from "../GraphQL/Queries";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import "../styles/LocationDetailsCard.css";
import { DELETE_LOCATION } from "../GraphQL/Mutations";
import InlineEditInput from "./InlineEditInput";

const LocationDetailsCard = ({ locationId }: { locationId: string }) => {
  const tenant = import.meta.env.VITE_TENANT;
  const [locationData, setLocationData] = useState(null);
  const [showEditInput, setShowEditInput] = useState({
    fieldName: "",
    show: false,
  });

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATION, {
    variables: { locationReadId: locationId, tenant },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteLocation, { loading: isDeleting }] =
    useMutation(DELETE_LOCATION);

  useEffect(() => {
    if (data) {
      setLocationData(data.locationRead);
      setShowEditInput({
        fieldName: "",
        show: false,
      });
    }
  }, [data]);

  if (!locationId) {
    return (
      <div className="location-container">
        Select location from the location list to view details
      </div>
    );
  }

  return (
    <div className="location-container">
      {networkStatus === NetworkStatus.refetch || loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          <div className="location-details-header">
            <button
              className="location-details-refresh"
              onClick={() => refetch()}
            >
              Refresh
            </button>
            <h3>{locationData?.resource?.name}</h3>

            <button
              className="location-details-refresh"
              onClick={() =>
                deleteLocation({
                  variables: {
                    locationRemoveId: locationData?.id,
                    tenant: import.meta.env.VITE_TENANT,
                  },
                })
              }
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
          <div className="location-details">
            <div className="edit-detail">
              <p>Address: {locationData?.resource?.address}</p>
              {showEditInput.fieldName == "address" ? (
                <InlineEditInput
                  field={showEditInput.fieldName}
                  setShowEditInput={setShowEditInput}
                  id={locationId}
                />
              ) : (
                <button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "address",
                      show: true,
                    })
                  }
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>NPI: {locationData?.resource?.npi}</p>
              {showEditInput.fieldName == "npi" ? (
                <InlineEditInput
                  field={showEditInput.fieldName}
                  setShowEditInput={setShowEditInput}
                  id={locationId}
                />
              ) : (
                <button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "npi",
                      show: true,
                    })
                  }
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>Status: {locationData?.resource?.status}</p>
              {showEditInput.fieldName == "status" ? (
                <InlineEditInput
                  field={showEditInput.fieldName}
                  setShowEditInput={setShowEditInput}
                  id={locationId}
                />
              ) : (
                <button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "status",
                      show: true,
                    })
                  }
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>TaxId: {locationData?.resource?.taxId}</p>
              {showEditInput.fieldName == "taxId" ? (
                <InlineEditInput
                  field={showEditInput.fieldName}
                  setShowEditInput={setShowEditInput}
                  id={locationId}
                />
              ) : (
                <button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "taxId",
                      show: true,
                    })
                  }
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDetailsCard;
