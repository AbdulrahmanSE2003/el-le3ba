import { AlertCircle } from "lucide-react";
interface ErrorBannerProps {
  message: string;
}
export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-red-800 dark:text-red-300">
      <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
      <span className="font-body text-sm leading-relaxed">{message}</span>
    </div>
  );
}
