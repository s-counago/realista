"use client";

import { useEffect, useState } from "react";

export default function LandlordDetails() {
  const cachedLandlord = sessionStorage.getItem("landlord-data");
  const [landlordFromBrowser, setLandlordFromBrowser] = useState({ name: "" });
  useEffect(() => {
    if (window !== undefined) {
      const cachedLandlord = sessionStorage.getItem("landlord-data");
      setLandlordFromBrowser(
        cachedLandlord ? JSON.parse(cachedLandlord) : null
      );
    }
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {landlordFromBrowser.name}
      </h1>
    </div>
  );
}
