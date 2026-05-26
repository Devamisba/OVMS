interface CardProps {
  children: React.ReactNode;
}

export default function Card({
  children,
}: CardProps) {

  return (
    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-5
    ">
      {children}
    </div>
  );
}