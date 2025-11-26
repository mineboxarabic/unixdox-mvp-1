import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SettingsPage, preferencesService } from "@/features/settings";

export default async function Settings() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const preferences = await preferencesService.getPreferences(session.user.id);

  return <SettingsPage preferences={preferences} />;
}
