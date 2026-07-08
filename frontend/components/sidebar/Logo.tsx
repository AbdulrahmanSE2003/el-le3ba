import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ size }: { size?: number }) {
  const imageClasses = `w-${size} h-${size}`;
  return (
    <div className="flex items-center select-none">
      <div
        className={cn(
          `relative h-10 w-10 hover:bg-muted transition-colors duration-500 rounded-lg`,
          size ? imageClasses : "",
        )}
      >
        <Image src="/logo_sympol.png" alt="اللعبة" fill priority />
      </div>
    </div>
  );
}
