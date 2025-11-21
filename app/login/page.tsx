import { signIn } from "@/auth";

export default function SignInPage() {
  async function login() {
    "use server";
    await signIn("google");
  }

  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <form action={login}>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}