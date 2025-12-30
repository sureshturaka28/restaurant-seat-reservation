type Props = {
  reservations: any[];
  onEdit: (r: any) => void;
  onToggleStatus: (id: string, status: "ACTIVE" | "CANCELLED") => void;
};

const ReservationTable = ({
  reservations,
  onEdit,
  onToggleStatus,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Tables</th>
            <th className="p-3">Guests</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r.userId?.email}</td>
              <td className="p-3">{r.date}</td>
              <td className="p-3">{r.timeSlot}</td>
              <td className="p-3">
                {r.tableIds.map((t: any) => t.tableNumber).join(", ")}
              </td>
              <td className="p-3">{r.guests}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    r.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.status}
                </span>
              </td>

              <td className="p-3 text-right space-x-2">
             
                {r.status === "ACTIVE" && (
                  <button
                    onClick={() => onEdit(r)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() =>
                    onToggleStatus(r._id, r.status)
                  }
                  className="text-red-600 hover:underline"
                >
                  {r.status === "ACTIVE"
                    ? "Cancel"
                    : "Reactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
