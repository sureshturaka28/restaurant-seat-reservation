import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

import BookingForm from "../components/booking/BookingForm";
import TimeSlots from "../components/booking/TimeSlots";
import TableGrid from "../components/booking/TableGrid";
import ReservationCard from "../components/reservations/ReservationCard";
import Toast from "../components/ui/Toast";

const TIME_SLOTS = [
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
];

const today = new Date().toISOString().split("T")[0];

const UserDashboard = () => {
  const [tables, setTables] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [bookedTableIds, setBookedTableIds] = useState<string[]>([]);

  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState<number | "">("");
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const [toast, setToast] = useState<null | {
    message: string;
    type: "success" | "error";
  }>(null);

  const fetchData = async () => {
    const [t, r] = await Promise.all([
      api.get("/tables"),
      api.get("/reservations/my"),
    ]);
    setTables(t.data);
    setReservations(r.data);
  };

  const fetchBookedTables = async (slot: string) => {
    if (!slot) return setBookedTableIds([]);
    const res = await api.get("/reservations/by-slot", {
      params: { date, timeSlot: slot },
    });
    setBookedTableIds(
      res.data.flatMap((r: any) => r.tableIds.map((t: any) => t._id))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedSeats = tables
    .filter((t) => selectedTables.includes(t._id))
    .reduce((sum, t) => sum + t.capacity, 0);

  const handleBooking = async () => {
    try {
      await api.post("/reservations", {
        date,
        timeSlot,
        guests,
        tableIds: selectedTables,
      });

      setToast({ message: "🎉 Reservation confirmed!", type: "success" });
      setTimeSlot("");
      setGuests("");
      setSelectedTables([]);
      fetchData();
    } catch {
      setToast({ message: "Booking failed", type: "error" });
    }
  };

  const cancelReservation = async (id: string) => {
    await api.delete(`/reservations/${id}`);
    setToast({ message: "Reservation cancelled", type: "success" });
    fetchData();
  };

  return (
    <Layout title="Dashboard">
      {toast && (
        <Toast {...toast} onClose={() => setToast(null)} />
      )}

      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-6">
          🍽️ Book a Table
        </h2>

        <BookingForm
          date={date}
          guests={guests}
          today={today}
          onDateChange={setDate}
          onGuestsChange={setGuests}
        />

        <TimeSlots
          slots={TIME_SLOTS}
          selected={timeSlot}
          onSelect={(slot) => {
            setTimeSlot(slot);
            setSelectedTables([]);
            fetchBookedTables(slot);
          }}
        />

        <TableGrid
          tables={tables}
          selectedTables={selectedTables}
          bookedTableIds={bookedTableIds}
          onToggle={(id) =>
            setSelectedTables((prev) =>
              prev.includes(id)
                ? prev.filter((t) => t !== id)
                : [...prev, id]
            )
          }
        />

        <p className="mt-4 font-semibold">
          Seats Selected: {selectedSeats} / {guests || 0}
        </p>

        <button
          disabled={
            !date || !timeSlot || !guests || selectedSeats < guests
          }
          onClick={handleBooking}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Confirm Booking
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        My Reservations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservations.map((r) => (
          <ReservationCard
            key={r._id}
            reservation={r}
            onCancel={() => cancelReservation(r._id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default UserDashboard;
