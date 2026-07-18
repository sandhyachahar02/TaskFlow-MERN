const ConfirmModal = ({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <p className="mt-3 text-gray-600">{message}</p>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                hover:bg-gray-100
                transition
              "
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-red-600
                text-white
                hover:bg-red-700
                transition
                disabled:opacity-60
              "
            >
              {loading ? "Deleting..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
