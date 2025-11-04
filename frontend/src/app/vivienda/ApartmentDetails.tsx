"use client";

import { useState } from "react";

interface Apartment {
  id: number;
  landlordId: number | null;
  landlordName: string | null;
  provincia: string;
  ayuntamiento: string;
  calle: string;
  numero: string;
  piso: string | null;
  puerta: string | null;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  userId: number;
  landlordId: number | null;
  apartmentId: number | null;
  rating: number;
  title: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ApartmentDetailsProps {
  apartment: Apartment;
  reviews: Review[];
  userGoogleId: string;
  userName: string;
  userEmail: string;
  userImage: string;
}

export default function ApartmentDetails({ apartment, reviews, userGoogleId, userName, userEmail, userImage }: ApartmentDetailsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  const fullAddress = `${apartment.calle}, ${apartment.numero}${
    apartment.piso ? `, ${apartment.piso}` : ""
  }, ${apartment.puerta ? apartment.puerta : ""}, ${apartment.ayuntamiento}, ${
    apartment.provincia
  }`;

  // Render stars based on rating (1-5)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Detalles de la Vivienda
        </h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
        >
          Crear Review
        </button>
      </div>

      <div className="space-y-6">
        {/* Address Section */}
        <div className="border-b pb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Dirección
          </h2>
          <p className="text-xl text-gray-800">{fullAddress}</p>
        </div>

        {/* Landlord Section */}
        <div className="border-b pb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Gestionado por
          </h2>
          <p className="text-xl text-gray-800">
            {apartment.landlordName
              ? apartment.landlordName
              : "Sin información de gestión"}
          </p>
        </div>

        {/* Rating Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Valoración
          </h2>
          <div className="flex items-center gap-2">
            <div className="text-3xl">
              {renderStars(Math.round(apartment.averageRating))}
            </div>
            <span className="text-gray-600 text-lg">
              ({apartment.averageRating.toFixed(1)}/5 - {apartment.reviewCount}{" "}
              {apartment.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews</h2>
        {localReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reviews todavía</p>
        ) : (
          <div className="space-y-6">
            {localReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{renderStars(review.rating)}</div>
                    <span className="text-gray-600">({review.rating}/5)</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {review.title && (
                  <h3 className="font-semibold text-gray-800 mb-2">{review.title}</h3>
                )}
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                ¿Qué te pareció la vivienda?
              </h2>
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                  setReviewText("");
                  setRating(0);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Rating stars */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valoración *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-4xl focus:outline-none"
                  >
                    <span
                      className={
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Escribe tu opinión sobre la vivienda..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={6}
            />
            
            <button
              onClick={async () => {
                setIsSubmitting(true);
                try {
                  // First, get the user ID from the backend using googleId
                  const userResponse = await fetch("http://localhost:8080/api/alignUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                      googleId: userGoogleId,
                      name: userName,
                      email: userEmail,
                      pfp: userImage,
                    }),
                  });

                  if (!userResponse.ok) {
                    throw new Error("Failed to get user");
                  }

                  const user = await userResponse.json();

                  // Create the review
                  const reviewPayload = {
                    userId: user.id,
                    apartmentId: apartment.id,
                    rating: rating,
                    content: reviewText,
                  };
                  
                  console.log("Sending review:", reviewPayload);
                  
                  const response = await fetch("http://localhost:8080/api/reviews", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reviewPayload),
                  });

                  if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", response.status, errorText);
                    throw new Error(`Failed to create review: ${response.status} - ${errorText}`);
                  }

                  const newReview = await response.json();
                  
                  // Add the new review to the list
                  setLocalReviews([newReview, ...localReviews]);
                  
                  // Close popup and reset form
                  setIsPopupOpen(false);
                  setReviewText("");
                  setRating(0);
                  
                  // Refresh the page to show updated apartment rating
                  window.location.reload();
                } catch (error) {
                  alert("Error al crear la review: " + error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={!rating || !reviewText.trim() || isSubmitting}
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando..." : "Añadir review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
