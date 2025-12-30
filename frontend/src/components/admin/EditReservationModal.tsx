import { useState } from "react";
import api from "../../api/axios";

type Props = {
  reservation: any;
  tables: any[];
  onClose: () => void;
  onSave: (payload: any) => void;
};

const TIME_SLOTS = [
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
];

const EditReservationModal = ({
  reservation,
  tables,
  onClose,
  onSave,
}: Props) => {
  const [date, setDate] = useState(reservation.date);
  const [timeSlot, setTimeSlot] = useState(reservation.timeSlot);
  const [guests, setGuests] = useState(reservation.guests);
  const [selectedTables, setSelectedTables] = useState<string[]>(
    reservation.tableIds.map((t: any) => t._id)
  );

  const selectedSeats = tables
    .filter((t) => selectedTables.includes(t._id))
    .reduce((sum, t) => sum + t.capacity, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Edit Reservation
        </h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        >
          {TIME_SLOTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4"
        />

        <h3 className="font-semibold mb-2">Tables</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {tables.map((t) => (
            <button
              key={t._id}
              onClick={() =>
                setSelectedTables((prev) =>
                  prev.includes(t._id)
                    ? prev.filter((x) => x !== t._id)
                    : [...prev, t._id]
                )
              }
              className={`border p-3 rounded ${
                selectedTables.includes(t._id)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50"
              }`}
            >
              Table {t.tableNumber} ({t.capacity})
            </button>
          ))}
        </div>

        <p className="font-semibold mb-4">
          Seats: {selectedSeats} / {guests}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={selectedSeats < guests}
            onClick={() =>
              onSave({
                date,
                timeSlot,
                guests,
                tableIds: selectedTables,
              })
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
