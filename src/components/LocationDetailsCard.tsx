import { useEffect, useState } from "react";
import { GET_LOCATION } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import "../styles/LocationDetailsCard.css";

const LocationDetailsCard = ({ locationId }: { locationId: string }) => {
  const tenant = import.meta.env.VITE_TENANT;
  const [locationData, setLocationData] = useState(null);
  const [showEditInput, setShowEditInput] = useState(false);

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATION, {
    variables: { locationReadId: locationId, tenant },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setLocationData(data.locationRead);
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
      {loading ? (
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
              onClick={() => refetch()}
            >
              Delete
            </button>
          </div>
          <div className="location-details">
            <div>
              <p>{locationData?.resource?.address}</p>
              <button onClick={() => setShowEditInput(true)}>Edit</button>
            </div>
            <p>{locationData?.resource?.npi}</p>
            <p>{locationData?.resource?.status}</p>
            <p>{locationData?.resource?.taxId}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDetailsCard;
