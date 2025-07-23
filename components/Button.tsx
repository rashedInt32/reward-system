interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}
export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className ? className : "button"}`}
    >
      {children}
    </button>
  );
};
