"use client";

interface SearchFormProps {
  origin: string;
  destination: string;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
}

export default function SearchForm({
  origin,
  destination,
  setOrigin,
  setDestination,
}: SearchFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Origin Airport"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Destination Airport"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded-lg p-3"
        />
      </div>
    </div>
  );
}