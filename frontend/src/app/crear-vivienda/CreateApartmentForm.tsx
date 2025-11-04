"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateApartmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    provincia: "",
    ayuntamiento: "",
    calle: "",
    numero: "",
    piso: "",
    puerta: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pre-fill form with data from URL params
    setFormData({
      provincia: searchParams.get("provincia") || "",
      ayuntamiento: searchParams.get("ayuntamiento") || "",
      calle: searchParams.get("calle") || "",
      numero: searchParams.get("numero") || "",
      piso: searchParams.get("piso") || "",
      puerta: searchParams.get("puerta") || "",
    });
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/apartments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create apartment");
      }

      const data = await response.json();
      router.push(`/vivienda?id=${data.id}`);
    } catch (error) {
      alert("Error al crear la vivienda: " + error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="provincia" className="block text-sm font-medium mb-1">
            Provincia *
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-medium mb-1">
            Número *
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="ayuntamiento"
            className="block text-sm font-medium mb-1"
          >
            Ayuntamiento *
          </label>
          <input
            type="text"
            id="ayuntamiento"
            name="ayuntamiento"
            value={formData.ayuntamiento}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="piso" className="block text-sm font-medium mb-1">
            Piso (opcional)
          </label>
          <input
            type="text"
            id="piso"
            name="piso"
            value={formData.piso}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="calle" className="block text-sm font-medium mb-1">
            Calle *
          </label>
          <input
            type="text"
            id="calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="puerta" className="block text-sm font-medium mb-1">
            Puerta (opcional)
          </label>
          <input
            type="text"
            id="puerta"
            name="puerta"
            value={formData.puerta}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Vivienda"}
        </button>
      </div>
    </form>
  );
}
