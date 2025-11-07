import { useState } from "react";

export default function SearchLandlordForm() {
    const [formData, setFormData] = useState({provincia:""})
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/landlord/searchLandlord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            } //ME QUEDÉ AQUÍ
            )
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="provincia" className="block text-sm font-medium mb-1">
          Nombre de la inmobiliaria/Casero
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.provincia}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
