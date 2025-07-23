export const Loader = ({ size = 20 }: { size?: number }) => {
  return (
    <div
      className="border-2 border-green-300 border-t-transparent rounded-full animate-spin"
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};
