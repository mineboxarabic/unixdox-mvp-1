import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import { HomePage } from "@/features/home";
import { getHomeData } from "@/features/home/actions";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/register");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingCompleted: true },
  });

  if (!user?.onboardingCompleted) {
    redirect("/register");
  }

  const homeData = await getHomeData();

  return <HomePage data={homeData} />;
}
