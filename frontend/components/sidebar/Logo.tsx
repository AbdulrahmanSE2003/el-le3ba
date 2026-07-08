import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center select-none">
      <div className="relative h-10 w-10 hover:bg-muted transition-colors duration-500 rounded-lg">
        <Image src="/logo_sympol.png" alt="اللعبة" fill priority />
      </div>
    </div>
  );
}
