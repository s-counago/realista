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
          className={i <= rating ? "text-black font-black" : "text-gray-300 font-black"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between p-8 border-b-4 border-black bg-black text-white">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Property Details
        </h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-2 bg-white text-black border-2 border-white hover:bg-accent hover:text-white hover:border-accent font-black uppercase transition-colors"
        >
          Create Review
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Address Section */}
        <div className="border-l-8 border-accent pl-6">
          <h2 className="text-sm font-black text-black uppercase mb-2 tracking-widest">
            Address
          </h2>
          <p className="text-2xl font-bold text-black font-mono">{fullAddress}</p>
        </div>

        {/* Landlord Section */}
        <div className="border-l-8 border-black pl-6">
          <h2 className="text-sm font-black text-black uppercase mb-2 tracking-widest">
            Managed By
          </h2>
          <p className="text-2xl font-bold text-black font-mono">
            {apartment.landlordName
              ? apartment.landlordName
              : "NO INFO"}
          </p>
        </div>

        {/* Rating Section */}
        <div className="border-l-8 border-accent pl-6">
          <h2 className="text-sm font-black text-black uppercase mb-2 tracking-widest">
            Rating
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-3xl flex gap-1">
              {renderStars(Math.round(apartment.averageRating))}
            </div>
            <span className="text-black text-xl font-mono font-bold">
              ({apartment.averageRating.toFixed(1)}/5 - {apartment.reviewCount}{" "}
              {apartment.reviewCount === 1 ? "REVIEW" : "REVIEWS"})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t-4 border-black p-8">
        <h2 className="text-4xl font-black uppercase mb-8 text-black tracking-tighter">Reviews</h2>
        {localReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-mono uppercase">No reviews yet</p>
        ) : (
          <div className="space-y-6">
            {localReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-xl flex gap-1">{renderStars(review.rating)}</div>
                    <span className="text-black font-mono font-bold">({review.rating}/5)</span>
                  </div>
                  <span className="text-sm text-black font-mono font-bold uppercase">
                    {new Date(review.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {review.title && (
                  <h3 className="font-black text-black uppercase mb-2 text-lg">{review.title}</h3>
                )}
                <p className="text-black font-mono leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-white p-8 max-w-2xl w-full shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
              <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
                Rate Property
              </h2>
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                  setReviewText("");
                  setRating(0);
                }}
                className="text-black hover:text-accent text-4xl font-black leading-none"
              >
                ×
              </button>
            </div>
            
            {/* Rating stars */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-black uppercase mb-4">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-5xl focus:outline-none transition-transform hover:scale-110"
                  >
                    <span
                      className={
                        star <= (hoveredRating || rating)
                          ? "text-black font-black"
                          : "text-gray-300 font-black"
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
              placeholder="WRITE YOUR REVIEW HERE..."
              className="w-full px-4 py-4 border-4 border-black focus:outline-none focus:bg-black focus:text-white font-mono resize-none mb-6 text-lg"
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
              className="w-full px-6 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-none disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
