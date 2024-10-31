
import icon1 from "../../assets/Icon(0).svg"
import icon2 from "../../assets/Icon (1).svg"
import icon3 from "../../assets/Icon (2).svg"
import Stackedline from "./Stackedline"
type propsData={
    title:string,
    content:string, 
    imgUrl:string 
}

const propData:propsData[]=[
    {
        title:"33.5%",
        content:"Bounce Rate",
        imgUrl:icon1
    },{
        title:"100",
        content:"Returning Users",
        imgUrl:icon2

    },{
        title:"9,065",
        content:"PAGE SESSIONS",
        imgUrl:icon3
    }
]
export default function Acquisition(){

    return (
        <div className="mt-10 lg:w-1/2  border p- bg-white">
        <div className="flex flex-col items-start p-4 gap-6">
            <span className="flex flex-col  gap-[8px]">
                <h1 className="text-[16px] text-[#344054] leading-[16px] font-[500]">
                    Acquisition
                </h1>
                <h2 className="text-[#667085] leading-[18px]">
                    Tells you where your visitors originated from, such as search engines, social networks or website.
                </h2>
            </span>

<div className="sm:flex sm:flex-row sm:gap-10 md:gap-[29px] mt-6 gap-2 grid grid-cols-2">

    {
        propData.map((content,index)=>{
            return (
                <div key={index} className="flex w-full 2xl:min-w-[174px] p-2 flex-col gap-[8px]">
                    <span className="flex flex-row gap-2">
                        <img src={content.imgUrl} className=""/>

                        <h1 className="font-[500] text-[#344054] text-[18px] leading-[28px]">{content.title}</h1>
                    </span>
<p className="text-center text-[#98A2B3] font-[500] leading-[18px] uppercase">
{content.content}
    
</p>
                    </div>
            )
        })
    }
</div>

<div className="w-full">
<Stackedline/>
 
</div>
       </div>
        </div>
    )
}

