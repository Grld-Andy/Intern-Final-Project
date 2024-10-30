type propsTypes={
    imageUrl:string,
    title:string,
content:string 
}
export default function Card({imageUrl,title,content}:propsTypes){

    return (
        <div className="flex flex-col gap-[8px]">
            <img src={imageUrl} alt="passed image" className="xl:w-[40px] w-[25px] md:h-[40px]"/>

            <span className="flex flex-col gap-[8px]">
                <h1 className="text-[#344054]  font-[600] text-[18px] md:leading-[28px]">{title}</h1>
                <h2 className="font-[400] text-[16px] md:leading-[24px]">{content}</h2>
            </span>
        </div>
    )
}