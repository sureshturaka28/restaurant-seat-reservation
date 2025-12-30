type Props = {
  date: string;
  guests: number | "";
  today: string;
  onDateChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
};

const BookingForm = ({
  date,
  guests,
  today,
  onDateChange,
  onGuestsChange,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="text-sm font-medium text-gray-600">
          Reservation Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Number of Guests
        </label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="w-full border rounded-lg p-3 mt-1"
          placeholder="Enter guests"
        />
      </div>
    </div>
  );
};

export default BookingForm;
