interface Props {
  status: {
    label: string;
    className: string;
    dotClassName: string;
  };
}

export function SessionStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium w-max ${status.className}`}
    >
      <span className="flex h-2 w-2">
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${status.dotClassName}`}
        />
      </span>
      {status.label}
    </span>
  );
}
