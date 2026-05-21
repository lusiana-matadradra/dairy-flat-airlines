import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dairy Flat Airlines
        </h1>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/flights">Flights</Link>
          <Link href="/passenger">Passenger Lookup</Link>
        </div>
      </div>
    </nav>
  );
}