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

export async function createReviewForLandlord(
  userId: number,
  landlordId: number,
  rating: number,
  content: string,
  title: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/reviews`,
    {
      //ESTOY HACIENDO UN FETCH AL BACKEND QUE ES PRIVADO ASÍ QUE TENGO QUE HACERLO SERVER SIDE
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        apartmentId: null,
        landlordId: landlordId,
        rating: rating,
        content: content,
        title: title,
      }),
    }
  );

  if (!response.ok) {
    return 500;
  }
}
