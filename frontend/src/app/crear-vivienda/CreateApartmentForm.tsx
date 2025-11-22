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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/apartments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="provincia" className="block text-sm font-bold uppercase mb-2">
            Provincia *
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-bold uppercase mb-2">
            Número *
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border-4 border-black focus:outline-none focus:bg-accent focus:text-white font-mono"
          />
        </div>
        <div>
          <label
            htmlFor="ayuntamiento"
            className="block text-sm font-bold uppercase mb-2"
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
            Calle *
          </label>
          <input
            type="text"
            id="calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            required
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

      <div className="flex gap-6 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-4 text-xl font-bold uppercase border-4 border-black bg-white text-black hover:bg-black hover:text-white transition-none"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-4 text-xl font-black uppercase border-4 border-black bg-black text-white hover:bg-accent hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Vivienda"}
        </button>
      </div>
    </form>
  );
}
