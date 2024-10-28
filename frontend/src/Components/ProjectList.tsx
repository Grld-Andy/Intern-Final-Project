import image1 from '../assets/project1.png'
import image2 from '../assets/project2.png'
import image3 from '../assets/project3.png'
import image4 from '../assets/project4.png'
type projectList={
    title:string,
    content:string,
    imgurl:string 
}

const projectList:projectList[]=[
    { imgurl:image1,
        title:"Event seating planner",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability",

    },{
        imgurl:image2,
        title:"Travel Ltinerary builder",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability"
    },{
        imgurl:image3,
        title:"Server create",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability"
    },{
        imgurl:image4,
        title:"Welfare app",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability",
        
    },{
        imgurl:image4,
        title:"Welfare app",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability",
        
    },
    {
        imgurl:image4,
        title:"Welfare app",
        content:"Explore the principles and practices of user interface(UI) & user experience (UX) design. Learn to create intuitive, user centric interfaces that delight users and enhance product usability",
        
    }
]
export default function ProjectList(){
    return (
        <div className='grid grid-cols-3 gap-[32px]'>

            

 {
    projectList.map((content,index)=>(
        <div key={index} className='rounded-[8px] shadow'>
            <img src={content.imgurl} alt='content' className='w-full'/>
            <span className='p-[16px] bg-white border-[#D0D5DD] flex flex-col gap-[8px]'>
                <h1 className='font-[600] text-[18px] leading-[28px] text-[#344054]'>
                    {content.title}
                </h1>

                <h2
                className='font-[400] text-[14px] leading-[20px] text-[#344054]'
                >{content.content}</h2>


            </span>


            </div>
    ))
 }           
        </div>
    )
}