type propData={
    title:string,
    content:string
}
export default function Cards({title,content}:propData){
    return (
        <div className="border-[1px] bg-white border-[#D0D5DD] w-full rounded-[4px] lg:w-[296px] flex flex-col flex-1 gap-[8px] p-2  lg:h-[108px] lg:p-[24px]">
            <h2 className="font-[400] text-[14px]  text-[#667085] leading-[20px]">
                {title}
            </h2>

            <h1 className="text-[#101828] lg:text-[24px]  font-[600] leading-[32px] ">{content}</h1>
        </div>
    )
}