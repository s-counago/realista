import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import CreateApartmentForm from "./CreateApartmentForm";

export default async function CrearViviendaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Vivienda</h1>
        <CreateApartmentForm />
      </div>
    </div>
  );
}
