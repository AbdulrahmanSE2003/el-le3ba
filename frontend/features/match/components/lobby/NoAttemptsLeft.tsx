// features/match/components/lobby/NoAttemptsLeft.tsx

import { Trophy, Clock } from "lucide-react";

interface NoAttemptsLeftProps {
  teamName: string;
  eventTitle: string;
}

const NoAttemptsLeft = ({ teamName, eventTitle }: NoAttemptsLeftProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-8">
      
      {/* Trophy Icon */}
      <div className="text-8xl">🏆</div>

      {/* Headline */}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-primary font-display">
          عملتوا اللي عليكم!
        </h1>
        <p className="text-2xl font-semibold text-foreground">
          عاش يا فريق <span className="text-primary">{teamName}</span> خلّصتم كل المحاولات 💪
        </p>
      </div>

      {/* Divider */}
      <div className="w-16 h-1 rounded-full bg-primary/30" />

      {/* Supporting copy */}
      <div className="flex flex-col gap-2 max-w-sm">
        <p className="text-muted-foreground text-lg leading-relaxed">
          دلوقتي دوركم تستنوا وتشوفوا النتيجة 🍿
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          لما إيفنت <span className="text-foreground font-medium">{eventTitle}</span> تخلص، هيتحدد مين عدى للمرحلة الجاية
        </p>
      </div>

      {/* Waiting pill */}
      <div className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-3 rounded-full text-sm font-medium">
        <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
        في انتظار انتهاء الإيفنت
      </div>

    </div>
  );
};

export default NoAttemptsLeft;