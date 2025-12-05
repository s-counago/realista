"use server";
import { Review } from "./LandlordDetails";
import { auth } from "../../../auth";

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
  var createReviewRequestObject = {
    userId: -1,
    apartmentId: 0,
    landlordId: landlordId,
    rating: rating,
    content: content,
    title: title,
  };
  const session = await auth();
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/users/google/${session?.user?.id}`
  );
  if (!userResponse.ok) {
    console.log("MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEC");
    return "user-not-found";
  }
  const myUserData = await userResponse.json();
  createReviewRequestObject.userId = myUserData.id; //Set id from my DB into the request object
  console.log(JSON.stringify(createReviewRequestObject));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createReviewRequestObject),
    }
  );

  if (!response.ok) {
    console.log(response.status, response.statusText);
    return 500;
  }
  console.log(response.status);
}
