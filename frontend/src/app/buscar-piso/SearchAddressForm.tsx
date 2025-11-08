"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchAddressForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    provincia: "",
    ayuntamiento: "",
    calle: "",
    numero: "",
    piso: "",
    puerta: "",
  });
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotFoundMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/searchAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        switch (response.status) {
          case 404:
            setNotFoundMessage(
              "Vivienda no encontrada, ¿podrías crearla y ayudarnos a mejorar Realista?"
            );
            return;
        }
      }

      const data = await response.json();
      router.push(`/vivienda?id=${data.id}`);
    } catch (error) {
      alert(error);
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
            Provincia
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-medium mb-1">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="ayuntamiento"
            className="block text-sm font-medium mb-1"
          >
            Ayuntamiento
          </label>
          <input
            type="text"
            id="ayuntamiento"
            name="ayuntamiento"
            value={formData.ayuntamiento}
            onChange={handleChange}
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
            Calle
          </label>
          <input
            type="text"
            id="calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
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
      {notFoundMessage && (
        <div className="flex items-center justify-between gap-4 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded p-3">
          <span>{notFoundMessage}</span>
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams({
                provincia: formData.provincia,
                ayuntamiento: formData.ayuntamiento,
                calle: formData.calle,
                numero: formData.numero,
                piso: formData.piso || "",
                puerta: formData.puerta || "",
              });
              router.push(`/crear-vivienda?${params.toString()}`);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
          >
            Crear
          </button>
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buscar Dirección
      </button>
    </form>
  );
}
