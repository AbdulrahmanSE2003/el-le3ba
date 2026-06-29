import MainTitle from "@/features/auth/components/MainTitle";

export default function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Pulsing logo */}
      <div className="animate-pulse">
        <MainTitle />
      </div>

      {/* Spinner */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-border" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary animate-spin" />
      </div>

      <p className="font-body text-mid text-base animate-pulse">
        جاري التحميل...
      </p>
    </div>
  );
}
