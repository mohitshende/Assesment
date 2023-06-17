import "./styles/App.css";
import LocationDetailsCard from "./components/LocationDetailsCard";
import LocationsList from "./components/LocationsList";
function App() {
  return (
    <div className="main">
      <LocationDetailsCard />
      <LocationsList />
    </div>
  );
}

export default App;
