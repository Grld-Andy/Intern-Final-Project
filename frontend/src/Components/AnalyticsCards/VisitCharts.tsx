import arrowUp from "../../assets/arrow-up-right.svg";

const Data = [
    { title: "Event Seating Planner", value: 70 },
    { title: "Travel", value: 38 },
    { title: "Server Create", value: 60 },
    { title: "Welfare App", value: 80 },
    { title: "Crowdfund Project", value: 80 },
];


const getBarColor = (value:number) => {
    if (value >= 80) return "bg-green-500"; 
    if (value >= 60) return "bg-blue-400";  
    if (value >= 40) return "bg-yellow-500"; 
    return "bg-red-500";                      
};

export default function VisitCharts() {
    return (
        <div className="bg-white lg:w-1/2 mt-10 border-[1px] border-[#D0D5DD]">
            <span className="flex border-b flex-row p-2 md:p-[14px] justify-between items-center">
                <h1 className="text-[#344054] font-[500] md:text-[16px] text-[12px] leading-[24px]">
                 Total Project Visits
                </h1>
                <h2 className="text-[#667085] text-[12px] leading-[18px] font-[400]">
                    Mar 01 - Mar 20, 2024
                </h2>
            </span>

            <table className="w-full">
                <thead>
                    <tr className="text-[12px] p-2 grid grid-cols-4 text-[#98A2B3] font-[500]">
                        <td className="text-center flex-1">LINK</td>
                        <td className="text-center flex-1">PROJECT TITLES</td>
                        <td className="text-center flex-1">PERCENTAGES</td>
                        <td className="text-center flex-1">VALUE</td>
                    </tr>
                </thead>

                <tbody>
                    {Data.map((content, index) => {
                        return (
                            <tr key={index} className="grid flex-1 grid-cols-4 items-center p-2  justify-around gap-10">
                                <td className="mx-auto">
                                    <img src={arrowUp} alt="Arrow Up" />
                                </td>
                                <td className="items-center">{content.title}</td>
                                <td className=" w-full">
                                    <div className="w-full bg-gray-200 rounded ">
                                        <div
                                            className={`h-[8px] ${getBarColor(content.value)} rounded-[4px]`}
                                            style={{ width: `${content.value}%` }} 
                                        />
                                    </div>
                                </td>
                                <td className="text-center">{content.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
