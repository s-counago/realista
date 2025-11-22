"use client";

import { useEffect, useState } from "react";

interface Landlord {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  averageRating: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function LandlordDetails() {
  const [landlordFromBrowser, setLandlordFromBrowser] = useState<Landlord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedLandlord = sessionStorage.getItem("landlord-data");
      setLandlordFromBrowser(
        cachedLandlord ? JSON.parse(cachedLandlord) : null
      );
      setLoading(false);
    }
  }, []);

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-black text-2xl font-black">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-black text-2xl font-black">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-2xl font-black">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!landlordFromBrowser) {
    return (
      <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase text-black">Error</h2>
          <p className="text-black font-bold mt-2">No se encontró información del propietario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header Section */}
      <div className="border-b-4 border-black p-8 bg-black text-white">
        <h1 className="text-5xl font-black uppercase mb-4 tracking-tighter">{landlordFromBrowser.name}</h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-white px-2 py-1 border-2 border-white text-black">{renderStars(landlordFromBrowser.averageRating)}</div>
          <span className="text-2xl font-black text-accent">
            {landlordFromBrowser.averageRating.toFixed(1)}
          </span>
          <span className="text-white font-mono uppercase">
            ({landlordFromBrowser.reviewCount}{" "}
            {landlordFromBrowser.reviewCount === 1 ? "REVIEW" : "REVIEWS"})
          </span>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="p-8 border-b-4 border-black">
        <h2 className="text-2xl font-black uppercase text-black mb-6 border-l-8 border-accent pl-4">
          Contact Info
        </h2>
        <div className="space-y-4 font-mono text-lg">
          {landlordFromBrowser.email ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl">📧</span>
              <a
                href={`mailto:${landlordFromBrowser.email}`}
                className="text-black hover:bg-accent hover:text-white transition-colors px-1"
              >
                {landlordFromBrowser.email}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-2xl">📧</span>
              <span>Email no disponible</span>
            </div>
          )}

          {landlordFromBrowser.phone ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              <a
                href={`tel:${landlordFromBrowser.phone}`}
                className="text-black hover:bg-accent hover:text-white transition-colors px-1"
              >
                {landlordFromBrowser.phone}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-2xl">📞</span>
              <span>Teléfono no disponible</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating Statistics Section */}
      <div className="p-8">
        <h2 className="text-2xl font-black uppercase text-black mb-6 border-l-8 border-accent pl-4">
          Overall Rating
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2 font-bold uppercase">
              <span className="text-black">Average Score</span>
              <span className="text-2xl font-black text-black">
                {landlordFromBrowser.averageRating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="w-full border-4 border-black h-8 p-1">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{
                  width: `${(landlordFromBrowser.averageRating / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-center pt-4 border-t-4 border-black border-dashed">
            <p className="text-black font-mono mt-4">
              BASED ON{" "}
              <span className="font-black bg-black text-white px-2">
                {landlordFromBrowser.reviewCount}
              </span>{" "}
              VERIFIED {landlordFromBrowser.reviewCount === 1 ? "REVIEW" : "REVIEWS"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
