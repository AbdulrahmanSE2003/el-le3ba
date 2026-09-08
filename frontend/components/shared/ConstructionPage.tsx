import { Construction} from "lucide-react"

const ConstructionPage = () => {
  return (
    <section className="h-full w-full flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-xl border border-dashed border-border rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center gap-8 bg-card backdrop-blur-sm shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-5 rounded-full ring-8 ring-primary/5">
            <Construction className="size-14 stroke-[1.75] animate-pulse duration-700" />
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
            هذه الصفحة قيد الإنشاء
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            نعمل على إعداد هذه الصفحة وتجهيزها بأفضل صورة ممكّنة قريباً.
          </p>
        </div>

      </div>
    </section>
  )
}

export default ConstructionPage