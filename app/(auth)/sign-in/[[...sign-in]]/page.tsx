import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      data-theme="dark"
      className="flex items-center justify-center min-h-screen bg-base-100"
    >
      <SignIn />
    </div>
  );
}


