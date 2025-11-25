"use client";

import { useState, createContext } from "react";
import { useRouter } from "next/navigation";
import type {
  SearchLandlordPayload,
  LandlordDetailsInterface,
} from "./actions";
import { getLandlord } from "./actions";

export default function SearchLandlordForm() {
  const router = useRouter();
  const landlordContext = createContext({});
  const [formData, setFormData] = useState({ name: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const landlordPayload: SearchLandlordPayload = { name: formData.name };
      const landlord: LandlordDetailsInterface = await getLandlord(
        landlordPayload
      );

      if (landlord.error === 404) {
        alert("no esite");
        throw new Error("404 No existe inmobiliaria");
      }
      if (landlord.error === 500) {
        alert("woooopsies la cagamos, somehow");
        throw new Error("500 woopsies desde la búsqueda de SearchLandlordForm");
      }
      sessionStorage.setItem("landlord-data", JSON.stringify(landlord));
      router.push(`/inmobiliaria?id=${landlord.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-bold uppercase mb-2">
          Nombre de la inmobiliaria/casero
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono text-lg mb-6"
          placeholder="ENTER NAME..."
        />
        <button
          type="submit"
          className="w-full px-6 py-4 text-xl font-black uppercase border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          Buscar Inmobiliaria
        </button>
      </div>
    </form>
  );
}
