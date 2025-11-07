import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  alignUser();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-gray-600 mb-4">{session.user.email}</p>
        <div className="flex gap-4 justify-center mb-4">
          <Link
            href="/buscar-piso"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar pisos
          </Link>
          <Link
            href="/buscar-inmobiliaria"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar inmobiliaria
          </Link>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

async function alignUser() {
  /*
  - Buscar en BE DB si google id existe
  - Si no existe, crearlo con Email, Google id, Nombre (anonimizado?), Pfp, 
  */
  const session = await auth();
  if (!session?.user) return null;
  console.log(session.user);
  const response = await fetch("http://localhost:8080/api/alignUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      googleId: session.user.id,
      name: session.user.name,
      email: session.user.email,
      pfp: session.user.image,
    }),
  });
  if (!response.ok) {
    console.log(response.status, response.statusText);
    throw new Error("MEEEEEEEEEEEEEEC en /profile/alignUser");
  }

  return await response.json();
}
