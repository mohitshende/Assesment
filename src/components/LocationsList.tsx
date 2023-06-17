import { useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../GraphQL/Queries";
import "../styles/LocationsList.css";
import Modal from "./Modal";

const LocationsList = ({
  setLocationId,
}: {
  setLocationId: (id: string) => void;
}) => {
  const tenant = import.meta.env.VITE_TENANT;

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATIONS, {
    variables: { tenant },
    notifyOnNetworkStatusChange: true,
  });

  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setLocations(data.locationList.resources);
    }
  }, [data]);

  const filterOptions = () => {
    if (searchText.length > 0) {
      return locations.filter((location) => location.name.includes(searchText));
    }
    return locations;
  };

  return (
    <div className="main-container">
      <div>
        <div className="header">
          <div className="header-top">
            <button onClick={() => refetch()}>Refresh</button>
            <h4>Locations</h4>
            <button onClick={() => setIsModalOpen(true)}>Add Location</button>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search location by name"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {networkStatus === NetworkStatus.refetch || loading ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className="locations-container">
            {filterOptions()?.map((location) => {
              const date = new Date(location.updatedAt);

              return (
                <div
                  key={location.id}
                  className="location-card"
                  onClick={() => {
                    setLocationId(location.id);
                  }}
                >
                  <div className="location-card-details">
                    <h5>{location.name}</h5>
                    <p>{location.address}</p>
                  </div>
                  <div className="location-card-details">
                    <h5>{location.status}</h5>
                    <p>
                      {date.toLocaleString("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetchList={refetch}
      />
    </div>
  );
};

export default LocationsList;
