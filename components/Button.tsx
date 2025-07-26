interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className ? className : "button"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
