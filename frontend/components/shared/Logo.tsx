// src/components/shared/Logo.tsx
const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 280 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="16"
        y="75"
        fontFamily="'Playpen Sans Arabic', 'Segoe UI', sans-serif"
        fontSize="68"
        fontWeight="800"
        fill="#5B5FEF"
        letterSpacing="-1"
      >
        اللعبة
        <span>.</span>
      </text>
      {/* <circle cx="253" cy="85" r="8" fill="#FFD23F" /> */}
    </svg>
  );
};

export default Logo;
