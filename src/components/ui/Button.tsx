interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  children,
  onClick,
}: ButtonProps) {

  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2
        rounded-xl
        bg-blue-900
        text-white
        text-sm
        font-semibold
        hover:bg-blue-800
        transition
      "
    >
      {children}
    </button>
  );
}