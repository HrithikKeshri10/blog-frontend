import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img
        src="/image.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="text-center relative z-10">
        <h1 className="text-5xl font-bold text-white mb-4">
          Discover your next adventure with AI
        </h1>
        <p className="text-xl text-white mb-8">
          Your personal trip planner and travel curator
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-white text-black px-8 py-3 rounded"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-white text-white px-8 py-3 rounded"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
