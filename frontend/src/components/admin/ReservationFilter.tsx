type Props = {
  date: string;
  onChange: (val: string) => void;
};

const ReservationFilter = ({ date, onChange }: Props) => (
  <div className="bg-white p-4 rounded-xl shadow mb-6">
    <label className="font-semibold block mb-2">
      Filter by date
    </label>
    <input
      type="date"
      value={date}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    />
  </div>
);

export default ReservationFilter;
