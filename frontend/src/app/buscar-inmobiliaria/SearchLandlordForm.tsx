"use client";

import { useState, createContext } from "react";
import { useRouter } from "next/navigation";

export default function SearchLandlordForm() {
  const router = useRouter();
  const landlordContext = createContext({});
  const [formData, setFormData] = useState({ name: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/landlord/searchLandlord`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 404) {
        alert("no esite");
        throw new Error("404 No existe inmobiliaria");
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("landlord-data", JSON.stringify(data));
      console.log(sessionStorage.getItem("landlord-data"));
      router.push(`/inmobiliaria?id=${data.id}`);
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
        <label htmlFor="provincia" className="block text-lg font-bold uppercase mb-2">
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
