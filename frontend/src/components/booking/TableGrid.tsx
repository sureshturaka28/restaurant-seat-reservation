type Props = {
  tables: any[];
  selectedTables: string[];
  bookedTableIds: string[];
  onToggle: (id: string) => void;
};

const TableGrid = ({
  tables,
  selectedTables,
  bookedTableIds,
  onToggle,
}: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tables.map((t) => {
        const selected = selectedTables.includes(t._id);
        const booked = bookedTableIds.includes(t._id);

        return (
          <button
            key={t._id}
            disabled={booked}
            onClick={() => onToggle(t._id)}
            className={`p-5 rounded-xl border text-left transition
              ${
                booked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selected
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
          >
            <h3 className="font-semibold text-lg">
              Table {t.tableNumber}
            </h3>
            <p className="text-sm opacity-80">
              Seats: {t.capacity}
            </p>
            {booked && (
              <span className="text-xs font-semibold text-red-600">
                Booked
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TableGrid;
