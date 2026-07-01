const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-end gap-0 leading-none ${className}`}>
      <span
        className={`font-display text-2xl font-bold text-primary leading-snug`}
      >
        اللعبة<span className={`text-accent text-3xl relative top-0.5`}>.</span>
      </span>
    </div>
  );
};

export default Logo;
