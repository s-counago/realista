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
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="text-center border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full">
        <h1 className="text-5xl font-black uppercase mb-6 tracking-tighter">Profile</h1>
        <div className="mb-8 p-4 border-2 border-black bg-gray-100">
          <p className="text-xl font-mono font-bold">{session.user.email}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <Link
            href="/buscar-piso"
            className="px-8 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Search Property
          </Link>
          <Link
            href="/buscar-inmobiliaria"
            className="px-8 py-4 bg-accent text-black text-xl font-black uppercase border-4 border-black hover:bg-black hover:text-white transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Search Landlord
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
            className="w-full px-8 py-4 bg-white text-red-600 text-xl font-black uppercase border-4 border-red-600 hover:bg-red-600 hover:text-white transition-none"
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/alignUser`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        googleId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        pfp: session.user.image,
      }),
    }
  );
  if (!response.ok) {
    console.log(response.status, response.statusText);
    throw new Error("MEEEEEEEEEEEEEEC en /profile/alignUser");
  }

  return await response.json();
}
