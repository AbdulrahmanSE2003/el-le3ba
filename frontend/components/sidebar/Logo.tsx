import Image from "next/image";

export default function Logo({ isCollapsed }: { isCollapsed?: boolean }) {
  return (
    <div className="flex items-center select-none">
      <div className="relative h-11 w-11">
        <Image src="/logo_sympol.png" alt="اللعبة" fill priority />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-black tracking-tight text-primary">
          اللعبة <span className={`text-accent text-2xl`}>.</span>
        </span>
      )}
    </div>
  );
}
