import { auth } from "../../../auth";
import { redirect } from "next/navigation";
interface InmobiliariaPageProps {
  searchParams: Promise<{ id?: string }>;
}
export default async function InmobiliariaPage({
  searchParams,
}: InmobiliariaPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const params = await searchParams;
  const landlordId = params.id;
  if (!landlordId) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">No landlord ID provided</p>
        </div>
      </div>
    );
  }
  let landlord;
  let reviews;

  try {
    // TODO: Fetch landlord data from backend
    // TODO: Fetch reviews from backend

    // Placeholder for now
    landlord = { name: "Example Landlord", email: "test@example.com" };
    reviews = [];
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">Failed to load landlord details</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* TODO: Create LandlordDetails component and pass data */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800">{landlord.name}</h1>
          {/* Add your content here! */}
        </div>
      </div>
    </div>
  );
}
