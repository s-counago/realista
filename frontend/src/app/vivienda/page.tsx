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
      <div className="flex min-h-screen items-center justify-center p-4 bg-white">
        <div className="text-center border-4 border-black p-8 bg-accent">
          <h1 className="text-4xl font-black uppercase text-black">Error</h1>
          <p className="text-black font-bold mt-2">No apartment ID provided</p>
        </div>
      </div>
    );
  }

  let apartment;
  let reviews;
  try {
    const [apartmentResponse, reviewsResponse] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/apartments/${apartmentId}`,
        {
          cache: "no-store",
        }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/apartments/${apartmentId}/reviews`,
        {
          cache: "no-store",
        }
      ),
    ]);

    if (!apartmentResponse.ok) {
      throw new Error("Apartment not found");
    }

    apartment = await apartmentResponse.json();
    reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-white">
        <div className="text-center border-4 border-black p-8 bg-accent">
          <h1 className="text-4xl font-black uppercase text-black">Error</h1>
          <p className="text-black font-bold mt-2">Failed to load apartment details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white">
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
