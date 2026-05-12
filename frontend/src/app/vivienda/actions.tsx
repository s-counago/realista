"use server";

import { authenticatedFetch } from "@/lib/api";
import type { Review } from "../vivienda/ApartmentDetails.tsx";

export async function createApartmentReview(
  apartmentId: number,
  rating: number,
  title: string,
  content: string
) {
  const emptyReview: Review = {
    id: 0,
    userId: 0,
    landlordId: null,
    apartmentId: null,
    rating: 0,
    title: null,
    content: "null",
    createdAt: "null",
    updatedAt: "null",
  };

  try {
    // Create review request (userId is now extracted from JWT on backend)
    const createReviewRequestObject = {
      apartmentId: apartmentId,
      landlordId: 0,
      rating: rating,
      title: title,
      content: content,
    };

    // Make authenticated request
    const createReviewResponse = await authenticatedFetch("/reviews", {
      method: "POST",
      body: JSON.stringify(createReviewRequestObject),
    });

    if (!createReviewResponse.ok) {
      console.error("Failed to create review:", createReviewResponse.status);
      return emptyReview;
    }

    const createdReview = await createReviewResponse.json();
    
    return {
      id: createdReview.id || -1,
      userId: createdReview.userId || 0,
      landlordId: createdReview.landlordId || 0,
      apartmentId: apartmentId,
      rating: rating,
      title: title,
      content: content,
      createdAt: createdReview.createdAt || Date(),
      updatedAt: createdReview.updatedAt || Date(),
    };
  } catch (error) {
    console.error("Error creating apartment review:", error);
    return emptyReview;
  }
}
