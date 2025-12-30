import { useEffect, useState } from "react";
import api from "../../api/axios";

const TIME_SLOTS = [
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const AdminCreateReservationModal = ({ onClose, onSuccess }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    userId: "",
    date: "",
    timeSlot: "",
    guests: 1,
    tableIds: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
    api.get("/tables").then(res => setTables(res.data));
  }, []);

  const toggleTable = (id: string) => {
    setForm((prev: any) => ({
      ...prev,
      tableIds: prev.tableIds.includes(id)
        ? prev.tableIds.filter((t: string) => t !== id)
        : [...prev.tableIds, id],
    }));
  };

  const submit = async () => {
    try {
      await api.post("/admin/reservations", form);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          Create Reservation (Admin)
        </h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, userId: e.target.value })
          }
        >
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.email}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, timeSlot: e.target.value })
          }
        >
          <option value="">Select Time Slot</option>
          {TIME_SLOTS.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          className="border p-2 w-full mb-3"
          placeholder="Guests"
          onChange={(e) =>
            setForm({ ...form, guests: Number(e.target.value) })
          }
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          {tables.map(t => (
            <button
              key={t._id}
              onClick={() => toggleTable(t._id)}
              className={`border p-3 rounded
                ${
                  form.tableIds.includes(t._id)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50"
                }`}
            >
              Table {t.tableNumber} ({t.capacity})
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Create Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateReservationModal;
