type Props = {
  activeTab: "ADMIN" | "RESERVATIONS";
  onChange: (tab: "ADMIN" | "RESERVATIONS") => void;
};

const AdminSidebar = ({ activeTab, onChange }: Props) => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10 text-indigo-400">
        Admin Panel
      </h2>

      <button
        onClick={() => onChange("ADMIN")}
        className={`w-full text-left px-4 py-3 rounded mb-3 transition
          ${
            activeTab === "ADMIN"
              ? "bg-indigo-600"
              : "hover:bg-gray-800"
          }`}
      >
        🛠️ Admin Controls
      </button>

      <button
        onClick={() => onChange("RESERVATIONS")}
        className={`w-full text-left px-4 py-3 rounded transition
          ${
            activeTab === "RESERVATIONS"
              ? "bg-indigo-600"
              : "hover:bg-gray-800"
          }`}
      >
        🍽️ Reservations
      </button>
    </aside>
  );
};

export default AdminSidebar;
