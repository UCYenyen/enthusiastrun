import Image from "next/image";
import { redirect } from "next/navigation";
import RegistrationForm from "@/components/pages/registration/RegistrationForm";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Normal Registration - Enthusiast Run",
  description:
    "Register for the Enthusiast Run normal registration! Secure your spot in the CATEGORY_5K or CATEGORY_10K run. Sign up now to join the excitement of Enthusiast Run.",
};

interface Slug {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NormalRegistrationPage({ params }: Slug) {
  const { slug } = await params;

  if (slug !== "CATEGORY_10K" && slug !== "CATEGORY_5K") {
    return redirect("/not-found");
  }

  if (slug == "CATEGORY_5K") {
    const registeredSuperEarlyBirdCount = await prisma.registration.findMany({
      where: {
        category: slug,
        type: "super_early_bird"
      }
    })

    const earlyBirdCount = await prisma.registration.findMany({
      where: {
        category: slug,
        type: "early_bird"
      }
    })

    if (registeredSuperEarlyBirdCount.length < 20) {
      return redirect(`/register/${slug}/super-early-bird`);
    }

    if(earlyBirdCount.length < 480){
      return redirect(`/register/${slug}/early-bird`);
    }
  } else {
    const registeredSuperEarlyBirdCount = await prisma.registration.findMany({
      where: {
        category: slug,
        type: "super_early_bird"
      }
    })

     const earlyBirdCount = await prisma.registration.findMany({
      where: {
        category: slug,
        type: "early_bird"
      }
    })

    if (registeredSuperEarlyBirdCount.length < 20) {
      return redirect(`/register/${slug}/super-early-bird`);
    }

    if(earlyBirdCount.length < 280){
      return redirect(`/register/${slug}/early-bird`);
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="h-[7vh]"></div>
      <div className="relative rounded-lg min-h-screen w-screen flex flex-col items-center bg-linear-to-bl from-[#73DADB] to-[#FFEBCE] text-white px-4 py-8">
        <Image
          src="/about/city-light.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-16 md:bottom-28 xl:bottom-48 w-screen h-auto"
        />
        <Image
          src="/about/city-dark.webp"
          draggable={false}
          alt="Description"
          width={900}
          height={900}
          className="absolute bottom-8 md:bottom-14 xl:bottom-16 w-screen h-auto"
        />
        <Image
          src="/home/cloud.webp"
          draggable={false}
          alt="Description"
          width={500}
          height={500}
          className="absolute bottom-0 md:bottom-0 xl:-bottom-32 w-screen h-auto"
        />

        {/* Header */}
        <div className="relative z-10 w-full max-w-4xl">
          <div className="bg-background border-4 border-white rounded-tl-xl rounded-tr-xl p-6 text-center">
            <Image
              src="/home/enthusiast-text-logo.webp"
              draggable={false}
              alt="Enthusiast Logo"
              width={300}
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-impact">REGISTRATION FORM</h1>
            <p className="text-xl font-futura mt-2">{slug.toUpperCase()} Run</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="relative z-10 w-full pb-32">
          <RegistrationForm category={slug as "CATEGORY_5K" | "CATEGORY_10K"} type="regular" mahasiswaUCEnabled={false} />
        </div>
      </div>
    </div>
  );
}
