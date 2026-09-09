import Error from "@/app/error";
import { getGamesOverTime } from "../../api/analytics"
import { GamesOverTimeChart } from "./GamesOverTimeChart";

const GamesOverTime = async() => {
    const gamesRes = await getGamesOverTime();
    if(!gamesRes.success) return <Error/>
    const analytics = gamesRes.data.analytics;

    return (
        <div className={`col-span-4 rounded-2xl max-h-104`}>
            <GamesOverTimeChart points={analytics?.points ?? []} title="إحصائيات المباريات" description="عرض تحليلي لعدد الجلسات والتفاعلات في اللعبة خلال الفترة الأخيرة."/>
        </div>

    )
}

export default GamesOverTime
