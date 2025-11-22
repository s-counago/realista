import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import LandlordDetails from "./LandlordDetails";

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
      <div className="flex min-h-screen items-center justify-center p-4 bg-white">
        <div className="text-center border-4 border-black p-8 bg-accent">
          <h1 className="text-4xl font-black uppercase text-black">Error</h1>
          <p className="text-black font-bold mt-2">No landlord ID provided</p>
        </div>
      </div>
    );
  }
  let landlord;
  let reviews;
  try {
    // TODO: Fetch landlord data from backend (actually from the browser)
    // TODO: Fetch reviews from backend
    landlord = { name: "Inmobiliaria testooo" };
    reviews = [];
  } catch (error) {
    console.log(error);
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-white">
        <div className="text-center border-4 border-black p-8 bg-accent">
          <h1 className="text-4xl font-black uppercase text-black">Error</h1>
          <p className="text-black font-bold mt-2">Failed to load landlord details</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white">
      <div className="w-full max-w-4xl">
        {/* TODO: Create LandlordDetails component and pass data */}
        <LandlordDetails />
        {/* Add your content here! */}
      </div>
    </div>
  );
}
