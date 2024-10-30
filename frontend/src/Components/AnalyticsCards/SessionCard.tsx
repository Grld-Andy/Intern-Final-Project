import Stackedline from "./Stackedline";
import color1 from "../../assets/Color.svg"
import color2 from "../../assets/Color (1).svg"
import color3 from "../../assets/Color (2).svg"
const Data=[{
    imgUrl:color1,
    title:"MOBILE",
    content:"6,098"
},{
    imgUrl:color2,
    title:"DESKTOP",
    content:"3,902"
},{
    imgUrl:color3,
    title:"OTHERS",
    content:"1,065"
}]

export default function SessionCard(){
    return (
        <div className="lg:w-1/2 flex flex-col space-y-[24px] bg-white mt-10 p-[14px]">
            <span className="">
                <h1 className="p-4 text-[#344054] text-[16px] leading-[24px] font-[500]">Device Sessions</h1>
            </span>

<div className="flex flex-row justify-between">{
    Data.map((content,index)=>(
        <div key={index} className="flex flex-col items-center gap-[8px]">
            <span className="flex flex-row gap-[8px]">
                <img src={content.imgUrl}/>
                <h2 className="text-[#98A2B3] leading-[18px] font-[500]">{content.title}
                </h2>
            </span>

            <h1 className="text-[#344054] leading-[28px] font-[500] text-[18px]">{content.content}</h1>
            </div>
    ))}
</div>
            <div>
                <Stackedline/>
            </div>
        </div>
    )
}