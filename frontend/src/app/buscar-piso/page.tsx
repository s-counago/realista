import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import SearchAddressForm from "./SearchAddressForm";

export default async function CrearReviewPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white">
      <div className="w-full max-w-3xl border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase mb-8 text-center tracking-tighter">
          Search Property
        </h1>
        <SearchAddressForm />
      </div>
    </div>
  );
}
