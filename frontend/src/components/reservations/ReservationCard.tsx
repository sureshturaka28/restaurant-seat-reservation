type Props = {
  reservation: any;
  onCancel: () => void;
};

const ReservationCard = ({ reservation, onCancel }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p><b>Date:</b> {reservation.date}</p>
      <p><b>Time:</b> {reservation.timeSlot}</p>
      <p><b>Guests:</b> {reservation.guests}</p>
      <p>
        <b>Tables:</b>{" "}
        {reservation.tableIds.map((t: any) => `Table ${t.tableNumber}`).join(", ")}
      </p>

      <button
        onClick={onCancel}
        className="mt-4 text-sm text-red-600 hover:underline"
      >
        Cancel Reservation
      </button>
    </div>
  );
};

export default ReservationCard;
