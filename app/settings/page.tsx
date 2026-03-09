import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SettingsPage, preferencesService } from "@/features/settings";
import { prisma } from "@/shared/config/prisma";

export default async function Settings() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [preferences, user] = await Promise.all([
    preferencesService.getPreferences(session.user.id),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    }),
  ]);

  return <SettingsPage preferences={preferences} userPlan={user?.plan ?? 'FREE'} />;
}
