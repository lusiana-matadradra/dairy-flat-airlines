export interface Flight {
  _id?: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  capacity: number;
  bookedSeats: number;
  price: number;
  aircraft: string;
}