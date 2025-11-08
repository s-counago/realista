import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import SearchLandlordForm from "./SearchLandlordForm";

export default async function BuscarInmobiliariaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Review</h1>
        <SearchLandlordForm />
      </div>
    </div>
  );
}
