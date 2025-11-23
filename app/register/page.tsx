import { auth } from "@/auth";
import RegisterPage from "./RegisterPage";

export default async function _RegisterPage() {
    const session = await auth();
    return <RegisterPage isAuthenticated={!!session?.user} />;
}
