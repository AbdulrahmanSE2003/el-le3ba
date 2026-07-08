interface Props {
  handleCancel: () => void;
  isPending: boolean;
}

export default function CancelPasswordEditBtn({
  handleCancel,
  isPending,
}: Props) {
  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={isPending}
      className="h-9 px-4 rounded-xl bg-secondary dark:bg-secondary/40 border border-border/50 text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer duration-200 disabled:opacity-50"
    >
      إلغاء
    </button>
  );
}
