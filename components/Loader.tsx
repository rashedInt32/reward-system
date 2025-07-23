export const Loader = ({ size = 8 }: { size?: number }) => {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-green-300 border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};
