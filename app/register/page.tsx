import { auth } from "@/auth";
import { prisma } from "@/shared/config/prisma";
import RegisterPage from "./RegisterPage";

export default async function _RegisterPage() {
    const session = await auth();
    let isAuthenticated = false;

    if (session?.user?.id) {
        // Verify user actually exists in DB (handles stale JWT sessions)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { id: true },
        });
        isAuthenticated = !!user;
    }

    return <RegisterPage isAuthenticated={isAuthenticated} />;
}
