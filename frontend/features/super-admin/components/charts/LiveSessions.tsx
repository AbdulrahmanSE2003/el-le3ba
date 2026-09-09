import Error from "@/app/error"
import { getLiveSessionsCount } from "../../api/analytics"
import { LiveSessionsWidget } from "./LiveSessionsWidget"

const LiveSessions = async() => {
    const liveSessionsRes = await getLiveSessionsCount()
    if(!liveSessionsRes.success) return <Error/>

    const liveCount =liveSessionsRes.data.analytics.count
    return (
    <div className="col-span-6 lg:col-span-2 rounded-2xl h-104">
          <LiveSessionsWidget count={liveCount} />
        </div>
    )
}

export default LiveSessions
