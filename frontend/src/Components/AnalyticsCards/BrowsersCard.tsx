import google from '../../assets/chrome.png'
import mozilla from "../../assets/firefox.png"
import apple from "../../assets/safari.png"
import edge from "../../assets/ie.png"
import opera from "../../assets/opera.png"
type tabletype={
    imgurl:string,
    title:string,
    content:string,
    content2:string ,
    content3:string 
}
const tablebody:tabletype[]=[
    {
        title:"Google chrome",
        imgurl:google,
        content:"13410",
        content2:"40.95%",
        content3:"19.45%"
    },{
        title:"Mozilla firefox",
        content:"13410",
        content2:"40.95%",
        content3:"19.45%"
        ,imgurl:mozilla
    },{
        title:"Apple Safari",
 imgurl:apple,
 content:"13410",
 content2:"40.95%",
 content3:"19.45%"

    },{
        title:"Microsoft Edge",
 imgurl:edge,
 content:"13410",
 content2:"40.95%",
 content3:"19.45%"  
    },{
        title:"Opera mini",
        imgurl:opera,
        content:"13410",
        content2:"40.95%",
        content3:"19.45%"  
               
    }
]

export default function BrowsersCard(){
    return (
        <div className='bg-white lg:w-1/2   mt-10 border-[1px] border-[#D0D5DD]'>
            <span className="flex border-b flex-row p-2 md:p-[14px] justify-between items-center">
                <h1 className='text-[#344054 font-[500] text-[14px] lg:text-[16px] leading-[24px]'>Browser Used by Users</h1>

                <h2 className='text-[#667085] text-[12px] leading-[18px] font-[400]'>Mar 01 - Mar,20 2024</h2>
            </span>


            <table className=' w-full'>
            
            <thead><tr className="text-[12px] p-2 
         grid grid-cols-4 
            text-[#98A2B3] font-[500]">
                <td className=' text-center flex-1'>
                    BROWSER</td>
                    <td className=' text-center flex-1'>SESSIONS</td>
                    <td className=' text-center flex-1'>BOUNCE RATE</td>
                    <td className=' text-center flex-1'>CONVERSION RATE</td>
                    </tr></thead>

                    <tbody>

                                  {
 tablebody.map((content,index)=>{
    return (
        
<tr key={index} className='grid grid-cols-4 p-2  justify-around md:gap-10 '>
    <td className='flex flex-row  gap-1 md:gap-[10px] items-center'>
        <img src={content.imgurl} className='md:w-[16px] h-[16px]'/>

        {content.title}
        </td>
        <td className='  text-center'>{content.content}</td>
       <td className='  text-center'>{content.content2}</td>
        <td className='text-center'>{content.content3}</td>
</tr>   
    )
 })                           
                        }
                 </tbody>
            </table>
        </div>
    )
}