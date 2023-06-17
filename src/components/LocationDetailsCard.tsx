import { useEffect } from "react";
import { GET_LOCATION } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

const LocationDetailsCard = ({ locationId }: { locationId: string }) => {
  const tenant = import.meta.env.VITE_TENANT;

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATION, {
    variables: { locationReadId: locationId, tenant },
    notifyOnNetworkStatusChange: true,
  });

  // useEffect(() => {
  //   if (data) {
  //     setLocations(data.locationList.resources);
  //   }
  // }, [data]);
  if (!locationId) {
    return <div></div>;
  }
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
};

export default LocationDetailsCard;
