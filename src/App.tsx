import LocationDetailsCard from "./components/LocationDetailsCard";
import LocationsList from "./components/LocationsList";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";

function App() {
  const [locationId, setLocationId] = useState("");

  return (
    <Flex justifyContent={"space-between"} p={"40px"} h={"100vh"}>
      <LocationDetailsCard
        locationId={locationId}
        setLocationId={setLocationId}
      />
      <LocationsList setLocationId={setLocationId} />
    </Flex>
  );
}

export default App;
