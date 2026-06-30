interface MainTitleProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: MainTitleProps) {
  const sizeClasses = {
    xs: "text-xl",
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  return (
    <div>
      <h1 className={`text-primary font-black ${sizeClasses[size]} duration-300`}>
        اللعبـ<span className="text-accent font-black">ة</span>
      </h1>
    </div>
  );
}
