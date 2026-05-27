"use client";

interface SearchFormProps {
  origin: string;
  destination: string;
  departureDate: string;

  setOrigin: (value: string) => void;

  setDestination: (
    value: string
  ) => void;

  setDepartureDate: (
    value: string
  ) => void;
}

export default function SearchForm({
  origin,
  destination,
  departureDate,
  setOrigin,
  setDestination,
  setDepartureDate,
}: SearchFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Origin Airport"
          value={origin}
          onChange={(e) =>
            setOrigin(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Destination Airport"
          value={destination}
          onChange={(e) =>
            setDestination(
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

        <input
         type="date"
         value={departureDate}
         onChange={(e) =>
          setDepartureDate(e.target.value)
  }
  className="flex-1 border-2 border-slate-900 rounded-xl px-4 py-4 bg-white"
/>
      </div>

      <p className="text-slate-500 text-sm mt-4">
        Search examples:
        NZNE (Dairy Flat),
        YSSY (Sydney),
        NZRO (Rotorua),
        NZCI (Tuuta),
        NZGB (Claris),
        NZTL (Lake Tekapo)
      </p>
    </div>
  );
}