"use client";
import { useState } from "react";
import { handleRegistro } from "../inmobiliaria/actions";

export default function RegistroForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
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
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:bg-accent focus:text-white text-black font-mono"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        onClick={() => handleRegistro(email, password)}
      >
        Registrarse
      </button>
    </form>
  );
}
