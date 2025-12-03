"use server";
import { Review } from "./LandlordDetails";

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
