type Props = {
  slots: string[];
  selected: string;
  onSelect: (slot: string) => void;
};

const TimeSlots = ({ slots, selected, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className={`p-3 rounded-xl border text-sm font-medium transition
            ${
              selected === slot
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;
