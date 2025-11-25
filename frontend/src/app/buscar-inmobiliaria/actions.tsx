"use server";

import { Averia_Gruesa_Libre } from "next/font/google";

export interface SearchLandlordPayload {
  name: string;
}

export interface LandlordDetailsInterface {
  id: number;
  average_rating: number;
  created_at: string;
  email: string;
  name: string;
  phone: string;
  review_count: number;
  updated_at: string;
  error: number;
}

export async function getLandlord(landlordPayload: SearchLandlordPayload) {
  const landlordNotFound: LandlordDetailsInterface = {
    id: -1,
    average_rating: -1,
    created_at: "",
    email: "",
    name: "",
    phone: "",
    review_count: -1,
    updated_at: "",
    error: 404,
  };
  const fuckedUpLandlord: LandlordDetailsInterface = {
    id: -1,
    average_rating: -1,
    created_at: "",
    email: "",
    name: "",
    phone: "",
    review_count: -1,
    updated_at: "",
    error: 500,
  };
  try {
    console.log(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/landlord/searchLandlord`
    );
    console.log(JSON.stringify(landlordPayload));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/landlord/searchLandlord`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(landlordPayload),
      }
    );
    if (!response.ok) {
      console.log(response.status, response.statusText);
      return landlordNotFound;
    }
    const landlord = await response.json();
    const landlordDetails: LandlordDetailsInterface = {
      id: landlord.id,
      average_rating: landlord.averageRating,
      created_at: landlord.createdAt,
      email: landlord.email,
      name: landlord.name,
      phone: landlord.phone,
      review_count: landlord.reviewCount,
      updated_at: landlord.updatedAt,
      error: 0,
    };
    return landlordDetails;
  } catch (error) {
    console.log(error);
    return fuckedUpLandlord;
  }
}
