import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ApartmentDetails from "./ApartmentDetails";

interface ViviendaPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ViviendaPage({
  searchParams,
}: ViviendaPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const apartmentId = params.id;

  if (!apartmentId) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">No apartment ID provided</p>
        </div>
      </div>
    );
  }

  let apartment;
  let reviews;
  try {
    const [apartmentResponse, reviewsResponse] = await Promise.all([
      fetch(`http://localhost:8080/api/apartments/${apartmentId}`, {
        cache: "no-store",
      }),
      fetch(`http://localhost:8080/api/apartments/${apartmentId}/reviews`, {
        cache: "no-store",
      }),
    ]);

    if (!apartmentResponse.ok) {
      throw new Error("Apartment not found");
    }

    apartment = await apartmentResponse.json();
    reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">Failed to load apartment details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <ApartmentDetails 
          apartment={apartment} 
          reviews={reviews} 
          userGoogleId={session.user.id || ""}
          userName={session.user.name || ""}
          userEmail={session.user.email || ""}
          userImage={session.user.image || ""}
        />
      </div>
    </div>
  );
}
