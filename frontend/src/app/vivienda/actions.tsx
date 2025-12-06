"use server";

import { auth } from "../../../auth";
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
  //landlorId=0 porque es una review de una vivienda
  const createReviewRequestObject = {
    userId: 0,
    apartmentId: apartmentId,
    landlordId: 0,
    rating: rating,
    title: title,
    content: content,
  };
  const session = await auth();
  const userResponse = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/users/google/${session?.user?.id}`
    )
  ).json();

  console.log(userResponse, userResponse.id);

  if (!userResponse) {
    return emptyReview;
  }

  createReviewRequestObject.userId = userResponse.id;

  const createReviewResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createReviewRequestObject),
    }
  );

  if (!createReviewResponse.ok) {
    return emptyReview;
  }

  const review: Review = {
    id: -1,
    userId: createReviewRequestObject.userId,
    landlordId: 0,
    apartmentId: apartmentId,
    rating: rating,
    title: title,
    content: content,
    createdAt: Date(),
    updatedAt: Date(),
  };

  return review;
}
