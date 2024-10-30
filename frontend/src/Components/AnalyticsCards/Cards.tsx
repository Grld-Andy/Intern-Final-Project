type propData={
    title:string,
    content:string
}
export default function Cards({title,content}:propData){
    return (
        <div className="border-[1px] bg-white border-[#D0D5DD] rounded-[4px] md:w-[296px] flex flex-col gap-[8px] md:h-[108px] md:p-[24px]">
            <h2 className="font-[400] text-[14px] text-[#667085] leading-[20px]">
                {title}
            </h2>

            <h1 className="text-[#101828] font-[600] leading-[32px] ">{content}</h1>
        </div>
    )
}