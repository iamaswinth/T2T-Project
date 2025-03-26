import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
  // Coordinates of sample recycling centers
  const recyclingCenters = [
    { lat: 40.73061, lng: -73.935242, name: "Recycling Center 1" },
    { lat: 40.741895, lng: -73.989308, name: "Recycling Center 2" },
    { lat: 40.712776, lng: -74.005974, name: "Recycling Center 3" },
  ];

  // Fix for default Leaflet icon issue with React
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  return (
    <div className="h-screen p-5 bg-gray-100">
      <h1 className="text-center text-2xl font-bold mb-5">Find Recycling Centers Near You</h1>

      <MapContainer
        center={[40.73061, -73.935242]} // Default center (NYC)
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {recyclingCenters.map((center, index) => (
          <Marker key={index} position={[center.lat, center.lng]}>
            <Popup>{center.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
