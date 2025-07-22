interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${className ? className : "button"}`}>
      {children}
    </button>
  );
};
