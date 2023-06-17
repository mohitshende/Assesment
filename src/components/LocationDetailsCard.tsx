import { useEffect, useState } from "react";
import { GET_LOCATION, GET_LOCATIONS } from "../GraphQL/Queries";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import "../styles/LocationDetailsCard.css";
import { DELETE_LOCATION } from "../GraphQL/Mutations";
import InlineEditInput from "./InlineEditInput";
import EditLocationModal from "./EditLocationModal";

const LocationDetailsCard = ({
  locationId,
  setLocationId,
}: {
  locationId: string;
  setLocationId: (id: string) => void;
}) => {
  const tenant = import.meta.env.VITE_TENANT;
  const [locationData, setLocationData] = useState(null);
  const [showEditInput, setShowEditInput] = useState({
    fieldName: "",
    show: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATION, {
    variables: { locationReadId: locationId, tenant },
    notifyOnNetworkStatusChange: true,
  });

  const { refetch: refetchLocations } = useQuery(GET_LOCATIONS, {
    variables: { tenant },
  });

  const [deleteLocation, { data: deletedLocationData, loading: isDeleting }] =
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

  useEffect(() => {
    if (deletedLocationData) {
      refetchLocations();
      setLocationId("");
    }
  }, [deletedLocationData]);

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
              style={{ padding: "5px 20px" }}
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
              style={{ padding: "5px 20px" }}
            >
              Delete
            </button>
          </div>
          <div className="location-details">
            <div className="edit-detail">
              <p>Address: {locationData?.resource?.address}</p>
              {showEditInput.fieldName == "address" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
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
                  style={{ padding: "5px 30px" }}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>NPI: {locationData?.resource?.npi}</p>
              {showEditInput.fieldName == "npi" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
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
                  style={{ padding: "5px 30px" }}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>Status: {locationData?.resource?.status}</p>
              {showEditInput.fieldName == "status" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
                  id={locationId}
                  value={locationData?.resource?.status}
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
                  style={{ padding: "5px 30px" }}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="edit-detail">
              <p>TaxId: {locationData?.resource?.taxId}</p>
              {showEditInput.fieldName == "taxId" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
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
                  style={{ padding: "5px 30px" }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <button
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Location
          </button>
        </>
      )}
      <EditLocationModal
        data={locationData?.resource}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetch={refetch}
      />
    </div>
  );
};

export default LocationDetailsCard;
