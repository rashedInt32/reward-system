export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[var(--primary)] relative rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <button
          onClick={onClose}
          className=" absolute top-[-30px] right-[-30px] text-gray-500 hover:text-gray-700 text-4xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
