import { redirect } from "next/navigation";
import { Metadata } from "next";

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

  // Regular price is sold out
  return redirect(`/register/${slug}/full`);

}
