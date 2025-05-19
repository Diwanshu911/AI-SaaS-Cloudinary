// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div
//       data-theme="dark"
//       className="flex items-center justify-center min-h-screen bg-base-100"
//     >
//       <SignUp />
//     </div>
//   );
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center mb-4">Sign Up</h2>
        <p className="text-center text-gray-400 mb-6">
          Access your Cloudinary dashboard
        </p>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition duration-200",
              formFieldInput:
                "w-full bg-white text-black border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
              formLabel: "text-gray-400 font-medium mb-1",
              formTitle: "text-lg font-semibold text-center mb-4",
              card: "bg-gray-200",
            },
          }}
        />
      </div>
    </div>
  );
}


