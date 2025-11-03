"use client";

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
}

export default function ApartmentDetails({ apartment, reviews }: ApartmentDetailsProps) {

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Detalles de la Vivienda
      </h1>

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
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reviews todavía</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
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
    </div>
  );
}
