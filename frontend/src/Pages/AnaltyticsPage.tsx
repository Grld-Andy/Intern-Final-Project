import Acquisition from "../Components/AnalyticsCards/Acquisition";
import BrowsersCard from "../Components/AnalyticsCards/BrowsersCard";
import Cards from "../Components/AnalyticsCards/Cards";
import BasicBars from "../Components/AnalyticsCards/Chartline";
import StackedAreas from "../Components/AnalyticsCards/Chartline";
import SessionCard from "../Components/AnalyticsCards/SessionCard";
import Stackedline from "../Components/AnalyticsCards/Stackedline";
import VisitCharts from "../Components/AnalyticsCards/VisitCharts";

export default function Analytics(){
    return (
        <div className="px-[80px] mt-[96px] bg-[#F9FAFB] ">
           
<div className="mb-2 space-y-[8px] pt-[10px]">
    <h1 className="font-[600]  text-[20px] text-[#101828] leading-[30px]">Welcome to Dashboard</h1>
    <h2 className="text-[#344054] text-[16px] font-[500]">
        Website Audience Metrics 
    </h2>
    <h3 className="text-[#667085] font-[400] leading-[18px] text-sm ">Audience to which the users belonged while on the current date range</h3>
</div>


<div className="flex flex-row gap-10 lg:gap-[32px]">
<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

</div>

<div className=" flex flex-col lg:flex-row gap-2">

    <BrowsersCard/>
    <VisitCharts/>
</div>

<div className="flex flex-col lg:flex-row lg:gap-[32px]">
<Acquisition/>
<SessionCard/>


</div>


<div className="w-[300px]">
<BasicBars/>

</div>
        </div>
    )
}