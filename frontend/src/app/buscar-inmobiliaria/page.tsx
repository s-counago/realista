import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";

export default async function BuscarInmobiliariaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
}
