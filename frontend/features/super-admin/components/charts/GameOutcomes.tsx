import Error from "@/app/error"
import { getGamesOutcome } from "../../api/analytics"
import { GameOutcomesChart } from "./GameOutcomesChart"

const GameOutcomes = async() => {
    const gamesRes = await getGamesOutcome()
    if(!gamesRes.success) return <Error/>
    const analytics = gamesRes.data.analytics
    return (
        <div>
             <GameOutcomesChart outcomes={analytics?.outcomes ?? []} total={analytics.total}/>
        </div>
    )
}

export default GameOutcomes
