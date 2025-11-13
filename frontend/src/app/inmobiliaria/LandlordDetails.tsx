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
          <span key={i} className="text-yellow-400 text-2xl">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400 text-2xl">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-2xl">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!landlordFromBrowser) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">No se encontró información del propietario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">{landlordFromBrowser.name}</h1>
        <div className="flex items-center gap-3">
          <div className="flex">{renderStars(landlordFromBrowser.averageRating)}</div>
          <span className="text-xl font-semibold">
            {landlordFromBrowser.averageRating.toFixed(1)}
          </span>
          <span className="text-blue-100">
            ({landlordFromBrowser.reviewCount}{" "}
            {landlordFromBrowser.reviewCount === 1 ? "reseña" : "reseñas"})
          </span>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="p-8 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Información de Contacto
        </h2>
        <div className="space-y-3">
          {landlordFromBrowser.email ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <a
                href={`mailto:${landlordFromBrowser.email}`}
                className="text-blue-600 hover:underline"
              >
                {landlordFromBrowser.email}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-2xl">📧</span>
              <span>Email no disponible</span>
            </div>
          )}

          {landlordFromBrowser.phone ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <a
                href={`tel:${landlordFromBrowser.phone}`}
                className="text-blue-600 hover:underline"
              >
                {landlordFromBrowser.phone}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-2xl">📞</span>
              <span>Teléfono no disponible</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating Statistics Section */}
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Valoración General
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Puntuación media</span>
              <span className="text-2xl font-bold text-blue-600">
                {landlordFromBrowser.averageRating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(landlordFromBrowser.averageRating / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-center pt-4">
            <p className="text-gray-600">
              Basado en{" "}
              <span className="font-semibold text-gray-800">
                {landlordFromBrowser.reviewCount}
              </span>{" "}
              {landlordFromBrowser.reviewCount === 1
                ? "reseña verificada"
                : "reseñas verificadas"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
