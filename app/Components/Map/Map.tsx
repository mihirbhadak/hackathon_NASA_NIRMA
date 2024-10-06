"use client"
import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapboxMap() {
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);
  const mapNode = React.useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("Mapbox token is not defined");
      return;
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: token,
      style: "mapbox://styles/mihirbhadak/cm1x457ie01az01r242c7d6z2",
    //   center: [32.87512111960764, -89.13771017816363], // Centering around Thaltej, Ahmedabad
      center: [72.5169, 23.0225], // Centering around Thaltej, Ahmedabad
      zoom: 12,
    });


    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!map) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("Mapbox token is not defined");
      return;
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=${token}`
    );

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      map.flyTo({ center: [lng, lat], zoom: 12 });
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div ref={mapNode} className="h-full w-full" />
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="mb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location"
            className="px-2 py-1 border border-gray-300 rounded-md mr-2"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MapboxMap;