import { useEffect, useState } from "react";
import arrowLeft from "../assets/arrow-left.svg"
import arrowRight from "../assets/arrow-right.svg"
type Request = {
    id: string;
    emailaddress:string,
    projectid: string;
    fullname: string;
    requestdate: string;
    comments: string;
    createdat: string;
    status: string;
};

type Data = {
    demoRequests: Request[];
};
type PageData={
    demolength?:number |null,
    pageNumber:number 
}
type ResponseData={
    demoRequests:Request[],
    totalDemoRequests:number ,
    currentPage:number,
    totalPages:number 
}

export default function Demopage() {
    const [data, setData] = useState<Data | null>(null);
    const[pageData,setPageData]=useState<PageData >({
        demolength:null,
pageNumber:0
    })
    const [pages,setPages]=useState<Array<number>>([])
    const[index,setIndex]=useState<number>(1)
   
 

    useEffect(() => {
        const fetchData = async (id:number) => {
            try {
                const response = await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests?page=${id<1 ? 1: id}`);
                const dataResponse = (await response.json()) as ResponseData
                console.log(dataResponse)
                if (dataResponse) {
                    setPageData({...pageData,demolength:dataResponse.totalDemoRequests,pageNumber:dataResponse.totalPages})

                    setData(dataResponse);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if(pageData?.pageNumber){
            if(index> pageData.pageNumber){
                setIndex(index-1)
            }}
          
        fetchData(index);
    }, [index]);

    useEffect(()=>{
//check page number
//if page number is 2
//generate a pagnination number



if(pageData?.pageNumber){
    if(index> pageData.pageNumber){
        setIndex(index-1)
    }
const genArray=[]
for(let i=0; i< pageData.pageNumber;i++){
    genArray.push(i+1)
}


if(genArray.length>0){
setPages([...genArray])
}
}
    },[pageData?.pageNumber])
    const changeApprove=async(id:string)=>{
        console.log(id)
        const requestBody={
            "status": "Approved"
          }
try {
    
    const results=await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests/${id}/status`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"

        },
        body:JSON.stringify(requestBody)
        
    })
    const da= await results.json()
    console.log(da)
} catch (error) {
    console.log(error)
}
    }

    const disapprove=async(id:string)=>{
        console.log(id)
        const requestBody={
            "status": "Denied"
          }
try {
    
    const results=await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests/8/status`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"

        },
        body:JSON.stringify(requestBody)
        
    })
    const da= await results.json()
    console.log(da)
} catch (error) {
    console.log(error)
}
    }
    
    return (
        <div className="mt-[126px]  border shadow-md 2xl:w-[95%] mb-10 mx-auto bg-white ">
        <span className="py-[10px] px-[24px] flex w-full flex-row items-start gap-2 bg-[#EAECF0]">

        <h1 className="text-[#101828] font-[500]  leading-[28px] text-[18px]">Demo Requests

</h1>
<h2 className="font-[#6941C6] font-[500] bg-[#F9F5FF] leading-[18px] text-[12px] p-1 xl:min-w-[24px]  rounded-full text-[#6941C6] ">{pageData?.demolength}</h2>

        </span>
            {data ? (
                <table className="w-full p-2">
                    <thead>
                        <tr className="border-b bg-[#EAECF0]">
                            
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Name</th>
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Email address</th>
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Demo request date & time</th>
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Project requested</th>
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Status</th>
                            <th className="text-[#667085] py-[12px] px-[24px] font-[500] leading-[18px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.demoRequests.map(request=> (
                            <tr key={request.id} className="border-b">
                               
                                <td className="text-[#667085] py-[16px] px-[24px]   text-center font-[400] text-[14px] leading-[20px]">{request.fullname}</td>
                                <td className="text-[#667085] py-[16px] px-[24px]  text-center font-[400] text-[14px] leading-[20px]">{request.emailaddress}</td>
                                <td className="text-[#667085] py-[16px] px-[24px] text-center font-[400] text-[14px] leading-[20px]">{new Date(request.requestdate).toLocaleDateString()}</td>
                                <td className="text-[#667085] py-[16px] px-[24px] text-center font-[400] text-[14px] leading-[20px]">{request.projectid}</td>
                                <td className="text-[#667085] py-[16px] px-[24px] text-center font-[400] text-[14px] leading-[20px]">{request.status === "Approved" && ("Approve") || request.status=== "active"&& ("Active") || request.status ==="Denied" && ("Denied")}</td>
                                <td className="flex flex-row  py-[16px] px-[24px] justify-center gap-[8px]">

                                    <button onClick={()=>changeApprove(request.id)} className="bg-[#1570EF] font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px]">Approve</button>
                                    <button onClick={()=>disapprove(request.id)} className="bg-white border font-[600] leading-[20px]  rounded-[8px] py-[10px] px-[16px]">Deny</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}

            <div className=" justify-between mb-6 flex flex-row pt-10 px-4"><button
            onClick={()=>setIndex(index-1)}
            className="border gap-[8px] items-center inline-flex items-center rounded-[8px] border py-[8px] px-[14px]">
                <img src={arrowLeft}/>
                Previous</button>
            
<span className="inline-flex  gap-6">

{pages?.map((content,index)=>(
    <div key={index} onClick={()=>setIndex(index+1)} className="bg-[#F9F5FF] p-2 rounded-sm px-4 cursor-pointer">
        <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
      
    </div>
))}
</span>


            <button onClick={()=>setIndex(index+1)}  
            className={`border gap-[8px] ${index>pageData?.pageNumber && 'cursor-not-allowed'} items-center inline-flex items-center rounded-[8px] border py-[8px] px-[14px]`}>Next

<img src={arrowRight}/>
            </button>
            </div>
        </div>
    );
}
