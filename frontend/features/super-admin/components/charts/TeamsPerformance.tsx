import Error from "@/app/error";
import { getTeamsPerformance } from "../../api/analytics"
import { TeamsPerformanceChart } from "./TeamsPerformanceChart";

const TeamsPerformance = async() => {
    const teamsRes = await getTeamsPerformance();
    if(!teamsRes.success) return <Error/>

    const teams = teamsRes.data.analytics.teams;

    const points= teams.map(t=>({
        team:t.teamName,
        points: t.totalPoints
    }))
    return (
        <div className={`col-span-6 lg:col-span-2 rounded-2xl max-h-104`}>
        <TeamsPerformanceChart points={points}/>
            
        </div>


    )
}

export default TeamsPerformance
