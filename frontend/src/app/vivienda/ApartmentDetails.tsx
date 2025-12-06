"use client";

import { useState } from "react";
import { createApartmentReview } from "./actions";

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

export interface Review {
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

export default function ApartmentDetails({
  apartment,
  reviews,
  userGoogleId,
  userName,
  userEmail,
  userImage,
}: ApartmentDetailsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [reload, setReload] = useState(false);

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
          className={
            i <= rating ? "text-black font-black" : "text-gray-300 font-black"
          }
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
          className="bg-accent text-black font-black uppercase px-4 py-2 border-2 border-black hover:bg-white transition-all ml-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1"
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
          <p className="text-2xl font-bold text-black font-mono">
            {fullAddress}
          </p>
        </div>

        {/* Landlord Section */}
        <div className="border-l-8 border-black pl-6">
          <h2 className="text-sm font-black text-black uppercase mb-2 tracking-widest">
            Managed By
          </h2>
          <p className="text-2xl font-bold text-black font-mono">
            {apartment.landlordName ? apartment.landlordName : "NO INFO"}
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
              ({apartment.averageRating.toFixed()}/5 - {apartment.reviewCount}{" "}
              {apartment.reviewCount === 1 ? "REVIEW" : "REVIEWS"})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t-4 border-black p-8">
        <h2 className="text-4xl font-black uppercase mb-8 text-black tracking-tighter">
          Reviews
        </h2>
        {localReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-mono uppercase">
            No reviews yet
          </p>
        ) : (
          <div className="space-y-6">
            {localReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-xl flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-black font-mono font-bold">
                      ({review.rating}/5)
                    </span>
                  </div>
                  <span className="text-sm text-black font-mono font-bold uppercase">
                    {new Date(review.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {review.title && (
                  <h3 className="font-black text-black uppercase mb-2 text-lg">
                    {review.title}
                  </h3>
                )}
                <p className="text-black font-mono leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full relative">
            <button
              onClick={() => {
                setIsPopupOpen(false);
                setReviewText("");
                setRating(0);
                setTitle("");
              }}
              className="absolute top-4 right-4 font-black text-xl hover:text-accent"
            >
              X
            </button>

            <h2 className="text-2xl font-black uppercase mb-6 border-l-8 border-accent pl-4">
              Crear Review
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-bold uppercase mb-2">
                  Calificación
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="text-4xl focus:outline-none transition-transform hover:scale-110"
                    >
                      <span
                        className={
                          star <= (hoveredRating || rating)
                            ? "text-black"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-2">
                  Título
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-full border-4 border-black p-2 font-mono focus:outline-none focus:border-accent"
                  />
                </label>
              </div>

              <div>
                <label className="block font-bold uppercase mb-2">
                  Contenido
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full border-4 border-black p-2 font-mono h-32 focus:outline-none focus:border-accent"
                  />
                </label>
              </div>

              <button
                onClick={async () => {
                  const review = await createReview(
                    apartment.id,
                    rating,
                    title,
                    reviewText
                  );
                  setIsPopupOpen(!isPopupOpen);
                  setReload(!reload);
                  setLocalReviews([review, ...localReviews]);
                }}
                disabled={!rating || !reviewText.trim() || isSubmitting}
                className="bg-black text-white font-black uppercase px-6 py-3 hover:bg-accent hover:text-black border-4 border-black transition-all w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  async function createReview(
    apartmentId: number,
    rating: number,
    title: string,
    content: string
  ) {
    const createReviewResponse = await createApartmentReview(
      apartmentId,
      rating,
      title,
      content
    );

    return createReviewResponse;
  }
}
