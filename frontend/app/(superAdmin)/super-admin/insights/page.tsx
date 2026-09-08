import KPISummary from "@/features/super-admin/components/insights/KPISummary"
import { Suspense } from "react"

const InsightsPage = () => {
    return (
        <section className={`space-y-6`}>
            <Suspense fallback={<div className={``}>ss</div>}>
                <KPISummary/>
            </Suspense >
            <div className={`grid grid-cols-6 gap-4`}>
                <div className={`bg-amber-500 col-span-4 rounded-2xl h-56 p-2`}>ss</div>
                <div className={`bg-rose-500 col-span-2 rounded-2xl h-56 p-2`}>ss</div>
                <div className={`bg-emerald-500 col-span-2 rounded-2xl h-56 p-2`}>ss</div>
                <div className={`bg-fuchsia-500 col-span-4 rounded-2xl h-56 p-2`}>ss</div>
            </div>
            <div className={`bg-violet-500  rounded-2xl h-76 p-2`}>ss</div>
        </section>
    )
}

export default InsightsPage
