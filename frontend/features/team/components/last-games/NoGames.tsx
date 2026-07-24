import StyleContainer from "@/components/shared/StyleContainer";

export default function NoGames() {
  return (
    <StyleContainer className="p-8 text-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <span className="text-4xl">🏟️</span>
        <p className="text-sm font-medium">لا توجد مباريات مسجلة بعد</p>
        <p className="text-xs">ستظهر هنا نتائج المباريات بعد إكمالها</p>
      </div>
    </StyleContainer>
  );
}
