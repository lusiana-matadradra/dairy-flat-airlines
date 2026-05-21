import "dotenv/config";
import client from "../lib/mongodb";

async function seedDatabase() {
  try {
    await client.connect();

    const db = client.db("airlineDB");

    const schedulesCollection =
      db.collection("schedules");

    await schedulesCollection.deleteMany({});

    const schedules = [];

    const today = new Date();

    for (let week = 0; week < 6; week++) {
      // Sydney flights (Friday)
      const sydneyDeparture = new Date(today);

      sydneyDeparture.setDate(
        today.getDate() + (5 - today.getDay()) + week * 7
      );

      sydneyDeparture.setHours(10, 0, 0);

      schedules.push({
        flightNumber: `DFSYD${week + 1}`,
        origin: "NZNE",
        destination: "YSSY",
        departureTime: sydneyDeparture,
        arrivalTime: new Date(
          sydneyDeparture.getTime() +
            3 * 60 * 60 * 1000
        ),
        capacity: 6,
        bookedSeats: 0,
        price: 1299,
        aircraft: "SyberJet SJ30i",
      });

      // Rotorua flights
      for (let day = 1; day <= 5; day++) {
        const rotoruaDeparture =
          new Date(today);

        rotoruaDeparture.setDate(
          today.getDate() -
            today.getDay() +
            day +
            week * 7
        );

        rotoruaDeparture.setHours(7, 0, 0);

        schedules.push({
          flightNumber: `DFROT${week}${day}`,
          origin: "NZNE",
          destination: "NZRO",
          departureTime: rotoruaDeparture,
          arrivalTime: new Date(
            rotoruaDeparture.getTime() +
              60 * 60 * 1000
          ),
          capacity: 4,
          bookedSeats: 0,
          price: 299,
          aircraft: "Cirrus SF50",
        });
      }

      // Great Barrier flights
      const barrierDays = [1, 3, 5];

      for (const day of barrierDays) {
        const barrierDeparture =
          new Date(today);

        barrierDeparture.setDate(
          today.getDate() -
            today.getDay() +
            day +
            week * 7
        );

        barrierDeparture.setHours(9, 0, 0);

        schedules.push({
          flightNumber: `DFGB${week}${day}`,
          origin: "NZNE",
          destination: "NZGB",
          departureTime: barrierDeparture,
          arrivalTime: new Date(
            barrierDeparture.getTime() +
              45 * 60 * 1000
          ),
          capacity: 4,
          bookedSeats: 0,
          price: 349,
          aircraft: "Cirrus SF50",
        });
      }

      // Chatham Islands flights
      const chathamDays = [2, 5];

      for (const day of chathamDays) {
        const chathamDeparture =
          new Date(today);

        chathamDeparture.setDate(
          today.getDate() -
            today.getDay() +
            day +
            week * 7
        );

        chathamDeparture.setHours(8, 0, 0);

        schedules.push({
          flightNumber: `DFCHAT${week}${day}`,
          origin: "NZNE",
          destination: "NZCI",
          departureTime: chathamDeparture,
          arrivalTime: new Date(
            chathamDeparture.getTime() +
              2.5 * 60 * 60 * 1000
          ),
          capacity: 5,
          bookedSeats: 0,
          price: 899,
          aircraft: "HondaJet Elite",
        });
      }

      // Tekapo flights
      const tekapoDeparture =
        new Date(today);

      tekapoDeparture.setDate(
        today.getDate() -
          today.getDay() +
          1 +
          week * 7
      );

      tekapoDeparture.setHours(11, 0, 0);

      schedules.push({
        flightNumber: `DFTEK${week}`,
        origin: "NZNE",
        destination: "NZTL",
        departureTime: tekapoDeparture,
        arrivalTime: new Date(
          tekapoDeparture.getTime() +
            2 * 60 * 60 * 1000
        ),
        capacity: 5,
        bookedSeats: 0,
        price: 699,
        aircraft: "HondaJet Elite",
      });
    }

    await schedulesCollection.insertMany(
      schedules
    );

    console.log(
      "Flight schedules seeded successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedDatabase();