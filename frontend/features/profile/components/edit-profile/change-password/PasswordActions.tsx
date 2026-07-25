import CancelPasswordEditBtn from "./CancelPasswordEditBtn";
import SavePasswordBtn from "./SavePasswordBtn";

interface Props {
  handleCancel: () => void;
  isPending: boolean;
}

export default function PasswordActions({ handleCancel, isPending }: Props) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <SavePasswordBtn isPending={isPending} />

      <CancelPasswordEditBtn
        handleCancel={handleCancel}
        isPending={isPending}
      />
    </div>
  );
}
