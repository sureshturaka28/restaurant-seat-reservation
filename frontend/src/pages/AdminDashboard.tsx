import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

// admin components
import AdminStats from "../components/admin/AdminStats";
import ReservationFilter from "../components/admin/ReservationFilter";
import ReservationTable from "../components/admin/ReservationTable";
import EditReservationModal from "../components/admin/EditReservationModal";
import TableManager from "../components/admin/TableManager";
import Toast from "../components/ui/Toast";

const today = new Date().toISOString().split("T")[0];

const AdminDashboard = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

 
  const [date, setDate] = useState(today);

  const [editingReservation, setEditingReservation] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);


  const fetchReservations = async () => {
    try {
      setLoading(true);

      const res = date
        ? await api.get("/admin/reservations/by-date", {
            params: { date },
          })
        : await api.get("/admin/reservations");

      setReservations(res.data);
    } catch {
      setToast({
        message: "Failed to load reservations",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    const res = await api.get("/tables");
    setTables(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, [date]);

  useEffect(() => {
    fetchTables();
  }, []);



  const toggleStatus = async (
    id: string,
    currentStatus: "ACTIVE" | "CANCELLED"
  ) => {
    try {
      await api.patch(`/admin/reservations/${id}/status`);

      setToast({
        message: "Reservation status updated",
        type: "success",
      });

      fetchReservations();
    } catch {
      setToast({
        message: "Failed to update status",
        type: "error",
      });
    }
  };

  const updateReservation = async (payload: any) => {
    try {
      await api.patch(
        `/admin/reservations/${editingReservation._id}`,
        payload
      );

      setEditingReservation(null);
      fetchReservations();

      setToast({
        message: "Reservation updated successfully",
        type: "success",
      });
    } catch (err: any) {
      setToast({
        message:
          err.response?.data?.message ||
          "Failed to update reservation",
        type: "error",
      });
    }
  };

 

  return (
    <Layout title="Admin Dashboard">
     
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

  
      <AdminStats reservations={reservations} />

    
      <ReservationFilter
        date={date}
        onChange={setDate}
      />

    
      {!loading && reservations.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow text-center mb-8">
          <h3 className="text-lg font-semibold mb-2">
            No bookings found
          </h3>
          <p className="text-gray-600">
            No reservations for {date}
          </p>
        </div>
      )}

     
      {reservations.length > 0 && (
        <ReservationTable
          reservations={reservations}
          onEdit={(r: any) =>
            setEditingReservation(r)
          }
          onToggleStatus={toggleStatus}
        />
      )}

      {/* TABLE MANAGER */}
      <TableManager />

      {/* EDIT MODAL */}
      {editingReservation && (
        <EditReservationModal
          reservation={editingReservation}
          tables={tables}
          onClose={() => setEditingReservation(null)}
          onSave={updateReservation}
        />
      )}
    </Layout>
  );
};

export default AdminDashboard;
