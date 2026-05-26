interface BadgeProps {
  label: string;
}

export default function Badge({
  label,
}: BadgeProps) {

  return (
    <span className="
      px-3 py-1
      rounded-full
      text-xs
      bg-slate-100
      text-slate-700
    ">
      {label}
    </span>
  );
}