type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg text-white
      ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-xl leading-none">
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
