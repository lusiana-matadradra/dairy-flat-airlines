import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-12 max-w-3xl w-full text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Dairy Flat Airlines
        </h1>

        <p className="text-slate-600 text-lg mb-8">
          Luxury regional travel from Dairy Flat Airport.
          Book flights quickly and manage your journey with ease.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/flights"
            className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition"
          >
            View Flights
          </Link>

          <Link
            href="/passenger"
            className="border border-slate-800 text-slate-800 px-6 py-3 rounded-xl hover:bg-slate-100 transition"
          >
            Passenger Lookup
          </Link>
        </div>
      </div>
    </div>
  );
}