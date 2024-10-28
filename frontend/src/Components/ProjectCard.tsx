type propData={
    number:string,
    title:string,
    content:string
}
const Data:propData[]=[
    {
        number:"1",
        title:"Real-World Impact",
        content:"Each project is designed to address real-world challenges and deliver measurable, lasting results that benefit businesses and communities alike."
    },{
        number:"2",
        title:"Client-Centric Solutions",
        content:"We customize every project to meet the specific needs and goals of our clients, ensuring a tailored approach that maximizes value and impact."
    },
    {
        number:"3",
        title:"Expertise and Quality",
        content:"Our team of experts ensures that every project meets the highest standards of quality, from concept to delivery, providing robust and reliable results."
    },{
        number:"4",
        title:"Data driven Decisions",
        content:"We use data analytics and insights to guide project decisions, ensuring our solutions are not only innovative but also grounded in evidence for maximum effectiveness."
    },{
        number:"5",
        title:"Collaborative Process",
        content:"We foster close collaboration with our clients, maintaining transparent communication throughout the project lifecycle to ensure their vision is fully realized."
    },
    {
        number:"6",
        title:"Sustainability and Scalability",
        content:"Our projects are built to be sustainable and scalable, enabling clients to grow and adapt their solutions over time as their needs evolve."
    }
]
export default function ProjectCard(){
    return (
        <div className="grid grid-cols-3 gap-[32px] lg:min-w-[1280px] lg:mx-center lg:h-[668px]">
{Data.map((content,index)=>{
        return (
            <div key={index} className="rounded-[16px] bg-[#125E7E]  p-[24px] flex flex-col gap-[16px] lg:min-w-[400px] lg:h-[318px]">
            <h1 className="font-[700] text-[128px] bg-gradient-to-b w-fit  bg-clip-text text-transparent from-white to-[#125E7E] leading-[90px]">{content.number}</h1>
            <h2 className="font-[600] text-[18px] text-white leading-[28px] ">{content.title}</h2>
            <h3 className="font-[400] text-[16px] text-white leading-[24px]">{content.content}</h3>
                    </div>
        )
    })
}

        </div>

        
    )
}