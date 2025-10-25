import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-gray-600">{session.user.email}</p>
      </div>
    </div>
  );
}
