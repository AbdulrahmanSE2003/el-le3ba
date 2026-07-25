type FormatNumberOptions = {
  compact?: boolean;
  decimals?: number;
};

export function formatNumber(
  value: number | string,
  { compact = false, decimals }: FormatNumberOptions = {},
): string {
  const num = typeof value === "string" ? Number(value) : value;

  if (Number.isNaN(num) || !num) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}


// formatNumber(1204);                       // "1,204"
// formatNumber(1204, { compact: true });     // "1.2K"
// formatNumber(1204.567, { decimals: 2 });   // "1,204.57"
// formatNumber(1000000, { compact: true });  // "1M"