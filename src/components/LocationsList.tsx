import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../GraphQL/Queries";

const LocationsList = () => {
  const tenant = import.meta.env.VITE_TENANT;

  const { loading, data } = useQuery(GET_LOCATIONS, {
    variables: { tenant },
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (data) {
      setLocations(data.locationList.resources);
    }
  }, [data]);

  if (loading) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {locations.map((location) => (
          <div key={location.id}>{location.name}</div>
        ))}
      </div>
    </div>
  );
};

export default LocationsList;
