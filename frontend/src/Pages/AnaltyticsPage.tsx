import BrowsersCard from "../components/AnalyticsCards/BrowsersCard";
import Cards from "../components/AnalyticsCards/Cards";

export default function Analytics(){
    return (
        <div className="px-[80px] mt-[96px] bg-[#F9FAFB] h-screen">
           
<div className="mb-2 space-y-[8px] pt-[10px]">
    <h1 className="font-[600]  text-[20px] text-[#101828] leading-[30px]">Welcome to Dashboard</h1>
    <h2 className="text-[#344054] text-[16px] font-[500]">
        Website Audience Metrics 
    </h2>
    <h3 className="text-[#667085] font-[400] leading-[18px] text-sm ">Audience to which the users belonged while on the current date range</h3>
</div>


<div className="flex flex-row md:gap-[32px]">
<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

<Cards title="Total Visitors" content="13,596"/>

</div>

<div>

    <BrowsersCard/>
</div>

        </div>
    )
}