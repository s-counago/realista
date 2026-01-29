"use server";
import { Review } from "./LandlordDetails";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { authenticatedFetch } from "@/lib/api";

interface ErrorNotFoundLandlord {
  error: number;
}

export async function getReviewsForLandlord(id: number) {
  const reviewResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/landlords/${id}/reviews`
  );
  if (!reviewResponse.ok) {
    return 500;
  }

  const reviews = await reviewResponse.json();

  // Fetch all users in parallel
  const reviewsWithUserResponse: Review[] = await Promise.all(
    reviews.map(async (review: any) => {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/${review.userId}`
      );
      const userData = await userResponse.json();
      return {
        ...review,
        name: userData.name,
      };
    })
  );

  return reviewsWithUserResponse;
}

export async function createReviewForLandlord(
  landlordId: number,
  rating: number,
  content: string,
  title: string
) {
  try {
    // Create review request (userId is now extracted from JWT on backend)
    const createReviewRequestObject = {
      apartmentId: 0,
      landlordId: landlordId,
      rating: rating,
      content: content,
      title: title,
    };

    // Make authenticated request
    const response = await authenticatedFetch("/reviews", {
      method: "POST",
      body: JSON.stringify(createReviewRequestObject),
    });

    if (!response.ok) {
      console.error("Failed to create landlord review:", response.status);
      return 500;
    }

    return 200;
  } catch (error) {
    console.error("Error creating landlord review:", error);
    return 500;
  }
}

export async function handleRegistro(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/registro`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    console.log("ERROR EN handleRegistro");
  }

  redirect("/profile");
}
