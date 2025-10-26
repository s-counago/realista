import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import SearchAddressForm from "./SearchAddressForm";

export default async function CrearReviewPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Review</h1>
        <SearchAddressForm />
      </div>
    </div>
  );
}
