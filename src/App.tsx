import "./styles/App.css";
import LocationDetailsCard from "./components/LocationDetailsCard";
import LocationsList from "./components/LocationsList";
import { useState } from "react";
function App() {
  const [locationId, setLocationId] = useState("");

  return (
    <div className="main">
      <LocationDetailsCard locationId={locationId} />
      <LocationsList setLocationId={setLocationId} />
    </div>
  );
}

export default App;
