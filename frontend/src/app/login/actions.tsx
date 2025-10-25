"use server";

import { auth, signIn } from "../../../auth";

export async function handleGoogleSignIn() {
  await signIn("google");
}

export async function alignUser() {
  /*
  - Buscar en BE DB si google id existe
  - Si no existe, crearlo con Email, Google id, Nombre (anonimizado?), Pfp, 
  */
  const session = await auth();
  if (!session?.user) return null;
  const response = await fetch("http://localhost:3000/api/alignUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      googleId: session.user.id,
      name: session.user.name,
      email: session.user.email,
      pfp: session.user.image,
    }),
  });
  if (!response.ok)
    throw new Error("MEEEEEEEEEEEEEEC en /login/actions.tsx/alignUser");

  return await response.json();
}
