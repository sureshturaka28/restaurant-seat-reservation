import { useEffect, useState } from "react";
import api from "../../api/axios";
import Toast from "../ui/Toast";

const TableManager = () => {
  const [tables, setTables] = useState<any[]>([]);
  const [editingTable, setEditingTable] = useState<any>(null);

  // new table form
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

 

  const fetchTables = async () => {
    const res = await api.get("/admin/tables");
    setTables(res.data);
  };

  useEffect(() => {
    fetchTables();
  }, []);



  const createTable = async () => {
    if (!newTableNumber || !newCapacity) {
      setToast({
        message: "Table number and capacity are required",
        type: "error",
      });
      return;
    }

    try {
      await api.post("/admin/tables", {
        tableNumber: Number(newTableNumber),
        capacity: Number(newCapacity),
      });

      setToast({
        message: "Table added successfully",
        type: "success",
      });

      setNewTableNumber("");
      setNewCapacity("");
      fetchTables();
    } catch (err: any) {
      setToast({
        message:
          err.response?.data?.message ||
          "Failed to create table",
        type: "error",
      });
    }
  };

 

  const saveTable = async () => {
    try {
      await api.patch(`/admin/tables/${editingTable._id}`, {
        tableNumber: Number(editingTable.tableNumber),
        capacity: Number(editingTable.capacity),
      });

      setEditingTable(null);
      fetchTables();

      setToast({
        message: "Table updated successfully",
        type: "success",
      });
    } catch {
      setToast({
        message: "Failed to update table",
        type: "error",
      });
    }
  };


  const deleteTable = async (id: string) => {
    if (!confirm("Delete this table?")) return;

    try {
      await api.delete(`/admin/tables/${id}`);
      fetchTables();

      setToast({
        message: "Table deleted successfully",
        type: "success",
      });
    } catch {
      setToast({
        message: "Failed to delete table",
        type: "error",
      });
    }
  };


  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">
        🍽️ Table Management
      </h2>

      {toast && (
        <Toast
          {...toast}
          onClose={() => setToast(null)}
        />
      )}

      {/* ➕ ADD TABLE */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="number"
          placeholder="Table number"
          value={newTableNumber}
          onChange={(e) => setNewTableNumber(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newCapacity}
          onChange={(e) => setNewCapacity(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <button
          onClick={createTable}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Table
        </button>
      </div>

      {/* TABLE LIST */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Table</th>
            <th className="p-3">Capacity</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tables.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="p-3">
                {editingTable?._id === t._id ? (
                  <input
                    type="number"
                    value={editingTable.tableNumber}
                    onChange={(e) =>
                      setEditingTable({
                        ...editingTable,
                        tableNumber: e.target.value,
                      })
                    }
                    className="border p-1 rounded w-24"
                  />
                ) : (
                  `Table ${t.tableNumber}`
                )}
              </td>

              <td className="p-3">
                {editingTable?._id === t._id ? (
                  <input
                    type="number"
                    value={editingTable.capacity}
                    onChange={(e) =>
                      setEditingTable({
                        ...editingTable,
                        capacity: e.target.value,
                      })
                    }
                    className="border p-1 rounded w-24"
                  />
                ) : (
                  t.capacity
                )}
              </td>

              <td className="p-3 text-right space-x-3">
                {editingTable?._id === t._id ? (
                  <>
                    <button
                      onClick={saveTable}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTable(null)}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingTable(t)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTable(t._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableManager;
