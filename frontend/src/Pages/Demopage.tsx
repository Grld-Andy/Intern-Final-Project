import { useEffect, useState } from "react";
import arrowLeft from "../assets/arrow-left.svg"
import arrowRight from "../assets/arrow-right.svg"
import { CircularProgress, LinearProgress} from "@mui/material";
import Box from '@mui/material/Box';
import axios from "axios";
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
      const[loading,setLoading]=useState(false)
    const[status,setStatus]=useState({
        modal:false, 
        state:""
    })
    const[id,setId]=useState<string | number>(0) 
    const fetchData = async (id:number) => {
        try {
            const response = await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests?page=${id<1 ? 1: id}`);
            const dataResponse = (await response.json()) as ResponseData
           
            if (dataResponse) {
                setPageData({...pageData,demolength:dataResponse.totalDemoRequests,pageNumber:dataResponse.totalPages})
                setData(dataResponse);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    console.log(pageData)
    const genPage=()=>{
        if(pageData){
          
          
            
        const genArray=[]
        for(let i=0; i< pageData.pageNumber;i++){
            genArray.push(i+1)
        }
        
        
        if(genArray.length>0){
       return setPages([...genArray])
        }
        
    }
}

    useEffect(() => {
        fetchData(index);
    },[index]);

    useEffect(()=>{
        genPage()
    },[pageData.pageNumber])

   console.log(index)

    const changeApprove = async() => {
        console.log(id)
        setLoading(true)
        const requestBody = {
            status: "Approved"
        }
        axios.patch(`https://intern-final-project.onrender.com/api/v1/demo-requests/${id}/status`, requestBody)
        .then((res) => {
            console.log(res.data)
            fetchData(index)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const disapprove = async() => {
        console.log(id)
        setLoading(true)
        const requestBody={
            "status": "Denied"
        }
        axios.patch(`https://intern-final-project.onrender.com/api/v1/demo-requests/${id}/status`, requestBody)
        .then((res) => {
            console.log(res.data)
            fetchData(index)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const changeDisplay=(ids:string,stats:string)=>{
        setId(ids)
        setStatus({...status,modal:true,state:stats})
    }


    return (
        <div className="mt-[126px] lg:w-[95%] min-w-[1200px] mx-auto lg:border overflow-x     lg:shadow-m w-full  mb-10 2xl:mx-auto bg-white  ">
       
      
            {data ? (
                <div className="relative">
      <div className="w-full ">
            {
                status.modal && (
                   status.state ==='Approve' ? (<div className="shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span>
                            <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Approve demo</h1>
                        </span>

                       <div className="">
                            <p>
                            Are you sure you want to approve this demo? Once approved, the requestor will receive an email containing test credentials.


                            </p>


<span className="flex flex-row gap-[8px] mt-[5px]">
    <button onClick={()=>setStatus({...status,modal:false})} className="rounded-[8px] border py-[10px] px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>
   
    <button onClick={changeApprove}
    disabled={loading ? true:false}
    className={`
    ${loading && 'flex flex-row gap-[4px] items-center'}
    bg-[#1570EF]  font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px]`}>Approve

{
    loading && (
        <Box sx={{ display: 'flex' }}>
      <CircularProgress color={"info"} />
    </Box>
    )
}

    </button>

</span>
                        </div> 
                    </div>):(<div className="shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span>
                            <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Deny demo</h1>
                        </span>
                        <div className="">
                            <p>
                            Are you sure you want to deny this demo? Once denied, the requestor will receive an email notifying them of the decision.


                            </p>



      
                          
                          


<span className="flex flex-row gap-[8px] mt-[5px]">
    <button onClick={()=>setStatus({...status,modal:false})} className="rounded-[8px] border py-[10px] px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>
   
    <button
    disabled={loading? true:false}
    onClick={disapprove} className={`${loading && 'flex flex-row gap-[4px] items-center'} bg-[#B42318]  font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px]`}>
        Deny

    {
    loading && (
        <Box sx={{ display: 'flex' }}>
      <CircularProgress color={"info"} />
    </Box>
    )
}

    </button>

  
</span>
                     

                        </div> 
                  
                        
                    </div>)
                  
             
                )
            }
</div>
      
                <table className=" grid grid-rows ">



           <thead className="lg:bg-[#EAECF0] w-full">
            <th className="py-[10px] px-[24px] flex w-full flex-row items-start gap-2  ">
            

<h1 className="text-[#101828] font-[500]  leading-[28px] text-[18px]">Demo Requests

</h1>
<h2 className="font-[#6941C6] font-[500] bg-[#F9F5FF] leading-[18px] text-[12px] p-1 xl:min-w-[24px]  rounded-full text-[#6941C6] ">{pageData?.demolength}</h2>


            </th>
           </thead>
                    <thead className="">
                        <tr className="border-b p-2 bg-[#EAECF0 grid grid-cols-6 justify-between w-full border]">
                            
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
                            <tr key={request.id} className="p-2 px-4 grid grid-cols-6 justify-between items-center">
                               
                                <td className="text-[#667085] py-[16px] px-[24px]   text-center font-[400] text-[14px] leading-[20px]">{request.fullname}</td>
                                <td className="text-[#667085] py-[16px] px-[24px]  text-center font-[400] text-[14px] leading-[20px]">{request.emailaddress}</td>
                                <td className="text-[#667085] py-[16px] px-[24px] text-center font-[400] text-[14px] leading-[20px]">{new Date(request.requestdate).toLocaleDateString()}</td>
                                <td className="text-[#667085] py-[16px] px-[24px] text-center font-[400] text-[14px] leading-[20px]">{request.projectid}</td>
                       
                       <td className=" py-[16px] px-[24px]  flex justify-center text-center font-[400] text-[14px] leading-[20px]">


                       <h1 className={`
                       ${request.status ==='Approved' && 'text-[#027A48] p-2 bg-[#ECFDF3] w-fit font-[500]'}
                          ${request.status ==='active' && 'text-[#027A48] p-2 bg-[#ECFDF3] w-fit font-[500]'}
                           ${request.status ==='Denied' && 'text-[#B42318] p-2 bg-[#FEF3F2] w-fit font-[500]'}
                       text-[#667085] 
                                
                               `}>{request.status === "Approved" && ("Approve") || request.status=== "active"&& ("Active") || request.status ==="Denied" && ("Denied")}</h1>
                        
                       </td>
                                <td className="flex flex-col lg:flex-row  py-[16px] px-[24px] justify-center  gap-[8px]">

                                    <button onClick={()=>changeDisplay(request.id,"Approve")} className="bg-[#1570EF] font-[600] leading-[20px] text-white rounded-[8px] py-[10px] w-24 px-[16px] w-fit lg:w-auto">Approve</button>
                                    <button onClick={()=>changeDisplay(request.id,"Deny")} className="bg-white border font-[600] leading-[20px]  rounded-[8px] py-[10px] px-[16px] w-24 lg:w-auto">Deny</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
</div>            ) : (
                
             <LinearProgress  />
                 
                
            )}

            <div className=" flex flex-row justify-between gap-12  lg:justify-between pt-10 mb-4  px-8 ">
                <button
            onClick={()=>setIndex(index-1)}
            className="border gap-[8px] w-fit lg:w-auto items-center inline-flex items-center rounded-[8px] border py-[8px] px-[14px]">
                <img src={arrowLeft}/>
                Previous</button>
            
<span className="inline-flex  gap-6">

{pages?.map((content,index)=>(
    <div key={index} onClick={()=>setIndex(index+1)} className="bg-[#F9F5FF] p-2 rounded-sm px-4 cursor-pointer">
        <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
      
    </div>
))}
</span>


            <button     onClick={() => setIndex(index + 1)}

            disabled={index>=pageData.pageNumber && true}
                    className="border gap-[8px] items-center inline-flex rounded-[8px] border py-[8px] px-[14px]"
                    >
                        Next
<img src={arrowRight}/>
            </button>
            </div>

            {
                status.modal && (
                    <div onClick={()=>setStatus({...status,modal:false})} className="bg-[#F9FAFB]  backdrop-blur-[16%] bg-opacity-[70%] fixed inset-0 top-0 z-30">
                        </div>
                )
            }
        </div>
    );
}
