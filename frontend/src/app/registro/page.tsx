"use client";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

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

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold uppercase text-black mb-2"
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:bg-accent focus:text-white text-black font-mono"
              placeholder="tu@ejemplo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold uppercase text-black mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:bg-accent focus:text-white text-black font-mono"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-black font-bold uppercase mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-accent hover:underline font-black">
            Entra
          </a>
        </p>
      </div>
    </div>
  );
  async function handleRegistro(email: string, password: string) {
    const response = fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }
}
