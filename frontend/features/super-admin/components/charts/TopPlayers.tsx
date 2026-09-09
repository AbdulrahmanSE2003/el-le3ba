import Error from "@/app/error";
import { getTopPlayers } from "../../api/analytics"
import { TopPlayersChart } from "./TopPlayersChart"

const TopPlayers = async() => {
    const topPlayersRes = await getTopPlayers();
    if(!topPlayersRes.success) return <Error/>
    const players = topPlayersRes.data.analytics.players
    return (
        <div className={`col-span-2 rounded-2xl h-104 border border-border`}> 
            <TopPlayersChart players={players}/>
        </div>
    )
}

export default TopPlayers
