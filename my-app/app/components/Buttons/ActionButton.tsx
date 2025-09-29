interface ActionButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
}

export function ActionButton({
  onClick,
  label,
  className,
  disabled,
  type,
}: ActionButtonProps) {
  return (
    <button
      className={`text-rw bg-addButton rounded-lg w-[80px] text-white p-2 font-inter  mt-1 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
