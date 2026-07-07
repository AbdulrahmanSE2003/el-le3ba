interface Props {
  onClick: () => void;
  isPending: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function NameActionBtn({
  onClick,
  isPending,
  children,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer duration-200 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
