const AdminStats = ({ reservations }: { reservations: any[] }) => {
  const active = reservations.filter(r => r.status === "ACTIVE").length;
  const cancelled = reservations.length - active;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Stat title="Total Reservations" value={reservations.length} color="indigo" />
      <Stat title="Active" value={active} color="green" />
      <Stat title="Cancelled" value={cancelled} color="red" />
    </div>
  );
};

const Stat = ({ title, value, color }: any) => (
  <div className={`bg-${color}-600 text-white p-6 rounded-xl shadow`}>
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

export default AdminStats;
