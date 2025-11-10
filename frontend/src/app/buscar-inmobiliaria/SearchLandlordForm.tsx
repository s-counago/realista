"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchLandlordForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/landlord/searchLandlord",
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
        <label htmlFor="provincia" className="block text-sm font-medium mb-1">
          Nombre de la inmobiliaria/casero
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Buscar Inmobiliaria
        </button>
      </div>
    </form>
  );
}
