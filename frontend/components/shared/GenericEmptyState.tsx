import { HardDrive, LucideIcon } from "lucide-react"

const GenericEmptyState = ({item, Icon}:{item?:string, Icon?:LucideIcon}) => {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-3 border border-border border-dashed rounded-lg p-6`}>
            <div className={`bg-brand/10 w-20 h-20 rounded-full flex items-center justify-center`}>
            {Icon ? <Icon className={`size-10 `}/>:<HardDrive className={`size-10 `}/>}
            </div>
             <p>لا يوجد {item ||"بيانات"} بعد!</p>
        </div>
    )
}

export default GenericEmptyState
