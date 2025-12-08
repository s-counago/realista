import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import RegistroForm from "./RegistroForm";

export default async function Register() {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black uppercase text-black mb-2 tracking-tighter">
            Realista
          </h1>
          <p className="text-black font-bold uppercase tracking-widest">
            Crea tu cuenta
          </p>
        </div>

        <RegistroForm></RegistroForm>

        <p className="text-center text-sm text-black font-bold uppercase mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-accent hover:underline font-black">
            Entra
          </a>
        </p>
      </div>
    </div>
  );
}
