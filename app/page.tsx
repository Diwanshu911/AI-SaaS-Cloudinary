import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  const { userId } = auth();

  // Redirect signed-in users to /home
  if (userId) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
      <div className="max-w-xl text-center space-y-6">
        <Image
          src="/logo.png" // Replace with your logo or image path
          alt="Cloudinary Showcase logo"
          width={110}
          height={100}
          className=" mx-auto rounded-full"
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Cloudinary Showcase
        </h1>
        <p className="text-lg text-gray-600">
          Upload and share your videos and images seamlessly with our AI-powered
          media tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <button className="btn btn-primary w-full sm:w-auto">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-outline w-full sm:w-auto">
              Sign Up
            </button>
          </SignUpButton>
        </div>

        <p className="text-sm text-gray-400">
          Continue using your Google account via Sign In.
        </p>
      </div>
    </main>
  );
}
