import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Normal Registration - Enthusiast Foam Run",
  description:
    "Register for the Enthusiast Foam Run normal registration! Secure your spot in the CATEGORY_5K run. Sign up now to join the excitement of Enthusiast Foam Run.",
};

interface Slug {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NormalRegistrationPage({ params }: Slug) {
  const { slug } = await params;

  if (slug !== "CATEGORY_5K") {
    return redirect("/not-found");
  }

  const session = await getServerSession(authOptions);

  // Allow admin users to access the page, redirect others
  if (session?.user?.role !== "admin") {
    return redirect(`/register/${slug}/full`);
  }

  return (
    <div>
      <h1>Normal Registration</h1>
      {/* Add your registration form here */}
    </div>
  );
}
