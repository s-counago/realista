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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/searchAddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="provincia" className="block text-sm font-bold uppercase mb-2">
            Provincia
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-bold uppercase mb-2">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label
            htmlFor="ayuntamiento"
            className="block text-sm font-bold uppercase mb-2"
          >
            Ayuntamiento
          </label>
          <input
            type="text"
            id="ayuntamiento"
            name="ayuntamiento"
            value={formData.ayuntamiento}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label htmlFor="piso" className="block text-sm font-bold uppercase mb-2">
            Piso (opcional)
          </label>
          <input
            type="text"
            id="piso"
            name="piso"
            value={formData.piso}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label htmlFor="calle" className="block text-sm font-bold uppercase mb-2">
            Calle
          </label>
          <input
            type="text"
            id="calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label htmlFor="puerta" className="block text-sm font-bold uppercase mb-2">
            Puerta (opcional)
          </label>
          <input
            type="text"
            id="puerta"
            name="puerta"
            value={formData.puerta}
            onChange={handleChange}
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
      </div>
      {notFoundMessage && (
        <div className="flex items-center justify-between gap-4 text-sm font-bold border-4 border-black bg-accent text-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
            className="px-4 py-2 border-2 border-white bg-black text-white hover:bg-white hover:text-black transition-none uppercase"
          >
            Crear
          </button>
        </div>
      )}
      <button
        type="submit"
        className="w-full px-6 py-4 text-xl font-black uppercase border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
      >
        Buscar Dirección
      </button>
    </form>
  );
}
