"use client";

import { useEffect, useState } from "react";

interface Landlord {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  average_rating: number;
  review_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  title: string;
  content: string;
  createdAt: Date;
  rating: number;
  name: string;
}

export default function LandlordDetails({
  reviews,
  handleCrearReview,
  landlordId,
}: any) {
  const [landlordFromBrowser, setLandlordFromBrowser] =
    useState<Landlord | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reloadPending, setReloadPending] = useState(false);

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
            ⯨
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
  const parsedReviews: Review[] = reviews.map((reviewJson: any) => ({
    title: reviewJson.title,
    content: reviewJson.content,
    createdAt: reviewJson.createdAt,
    rating: reviewJson.rating,
    name: reviewJson.name,
  }));

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
          <p className="text-black font-bold mt-2">
            No se encontró información del propietario
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header Section */}
      <div className="border-b-4 border-black p-8 bg-black text-white">
        <h1 className="text-5xl font-black uppercase mb-4 tracking-tighter">
          {landlordFromBrowser.name}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-white px-2 py-1 border-2 border-white text-black">
            {renderStars(landlordFromBrowser.average_rating)}
          </div>
          <span className="text-2xl font-black text-accent">
            {landlordFromBrowser.average_rating.toFixed(1)}
          </span>
          <span className="text-white font-mono uppercase">
            ({landlordFromBrowser.review_count}{" "}
            {landlordFromBrowser.review_count === 1 ? "REVIEW" : "REVIEWS"})
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-accent text-black font-black uppercase px-4 py-2 border-2 border-black hover:bg-white transition-all ml-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1"
          >
            Crear Review
          </button>
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
                {landlordFromBrowser.average_rating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="w-full border-4 border-black h-8 p-1">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{
                  width: `${(landlordFromBrowser.average_rating / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-center pt-4 border-t-4 border-black border-dashed">
            <p className="text-black font-mono mt-4">
              BASED ON{" "}
              <span className="font-black bg-black text-white px-2">
                {landlordFromBrowser.review_count}
              </span>{" "}
              VERIFIED{" "}
              {landlordFromBrowser.review_count === 1 ? "REVIEW" : "REVIEWS"}
            </p>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="p-8 border-t-4 border-black bg-gray-50">
        <h2 className="text-2xl font-black uppercase text-black mb-8 border-l-8 border-accent pl-4">
          Latest Reviews
        </h2>
        {/* Reviews List Container */}
        <div className="space-y-6">
          {/* TODO: Map your reviews here. This is a visual placeholder. */}
          {parsedReviews.map((review) => (
            <div
              key={review.title}
              className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Review Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b-2 border-black border-dashed pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-xl">
                    U{/* Placeholder for User Initial */}
                  </div>
                  <div>
                    <p className="font-bold uppercase text-lg leading-none">
                      {review.name}
                    </p>
                    <p className="font-mono text-xs text-gray-500 mt-1">
                      {review.createdAt.toString()}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex mt-2 md:mt-0">
                  {renderStars(review.rating)}
                </div>
              </div>
              {/* Review Content */}
              <div>
                <h3 className="text-xl font-black uppercase mb-2 text-accent">
                  {review.title}
                </h3>
                <p className="font-mono text-lg leading-relaxed text-gray-800">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
          {/* Empty State Placeholder (Optional) */}
          {landlordFromBrowser.review_count === 0 && (
            <div className="text-center py-12 border-4 border-dashed border-gray-300">
              <p className="font-mono text-xl text-gray-400 uppercase">
                No reviews yet
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
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
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-4xl focus:outline-none transition-transform hover:scale-110"
                    >
                      <span
                        className={
                          star <= (hoverRating || rating)
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
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.currentTarget.value)}
                    type="text"
                    className="w-full border-4 border-black p-2 font-mono focus:outline-none focus:border-accent"
                  />
                </label>
              </div>
              <div>
                <label className="block font-bold uppercase mb-2">
                  Contenido
                  <textarea
                    id="contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.currentTarget.value)}
                    className="w-full border-4 border-black p-2 font-mono h-32 focus:outline-none focus:border-accent"
                  />
                </label>
              </div>
              <button
                onClick={() =>
                  handleCrearReviewAndModalClosePlusReload(
                    parseInt(landlordId),
                    rating,
                    contenido,
                    titulo
                  )
                }
                className="bg-black text-white font-black uppercase px-6 py-3 hover:bg-accent hover:text-black border-4 border-black transition-all w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  async function handleCrearReviewAndModalClosePlusReload(
    landlordId: number,
    rating: number,
    contenido: string,
    titulo: string
  ) {
    const response = await handleCrearReview(
      landlordId,
      rating,
      contenido,
      titulo
    );
    if (response == 200) {
      setIsModalOpen(!isModalOpen);
      setReloadPending(!reloadPending);
    } else {
      console.log("MODAL NOT COSING MEEEEEEEEEEEEEEC");
    }
  }
}
