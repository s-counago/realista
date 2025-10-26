"use server";

import { auth, signIn } from "../../../auth";

export async function handleGoogleSignIn() {
  await signIn("google"); //no code runs after the signIn() method gets called. why?
  /*   console.log("handleGoogleSignIn");
  alignUser();
  console.log("handleGoogleSignIn 2"); */
}
