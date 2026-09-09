import Error from "@/app/error"
import { getGamesOutcome } from "../../api/analytics"
import { GameOutcomesChart } from "./GameOutcomesChart"

const GameOutcomes = async() => {
    const gamesRes = await getGamesOutcome()
    if(!gamesRes.success) return <Error/>
    const analytics = gamesRes.data.analytics
    return (
    <div className="col-span-2 rounded-2xl h-104" dir="rtl">
             <GameOutcomesChart outcomes={analytics?.outcomes ?? []} total={analytics.total}/>
        </div>
    )
}

export default GameOutcomes
