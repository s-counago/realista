"use server";

interface ErrorNotFoundLandlord {
  error: number;
}

export async function getReviewsForLandlord(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/landlords/${id}/reviews`
  );
  if (!response.ok) {
    return 500;
  }

  return await response.json();
}
