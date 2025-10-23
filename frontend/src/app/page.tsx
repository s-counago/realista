"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then((res) => res.text())
      .then((data) => setText(data))
      .catch((err) => console.error("Error fetching hello:", err));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <input
        type="text"
        className="w-96 rounded-lg border border-gray-300 px-4 py-2 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text..."
        value={text}
        readOnly
      />
    </div>
  );
}
