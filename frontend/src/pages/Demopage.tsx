import { useEffect, useState, useContext } from "react";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import { LinearProgress } from "@mui/material";
import getDemoRequestCreationString from "../utils/getDemoRequestCreationString";
import axios from "axios";
import { ActiveDemoRequestsContext } from "../contexts/ActiveDemoRequestsContext"; // Import ActiveDemoRequestsContext

type Request = {
    id: string;
    emailaddress: string;
    projectname: string;
    fullname: string;
    requestdate: string;
    requesttime: string;
    comments: string;
    createdat: string;
    status: string;
};

type Data = {
    demoRequests: Request[];
};

type PageData = {
    demolength?: number | null;
    pageNumber: number;
};

type ResponseData = {
    demoRequests: Request[];
    totalDemoRequests: number;
    currentPage: number;
    totalPages: number;
};

export default function Demopage() {
    const { activeDemoRequests, activeDemoRequestsDispatch } = useContext(ActiveDemoRequestsContext); // Use context for active demo requests
    const [demos, setDemos] = useState<Data | null>(null);
    const [pageData, setPageData] = useState<PageData>({
        demolength: null,
        pageNumber: 0,
    });
    const [pages, setPages] = useState<Array<number>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [index, setIndex] = useState<number>(1);
    const [requestStatus, setRequestStatus] = useState<string>("");
    const [status, setStatus] = useState({ modal: false, state: "" });
    const [id, setId] = useState<string | number>(0);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests/active/count`)
            .then((res) => {
                activeDemoRequestsDispatch({ type: 'SET', payload: res.data.activeDemoRequestsCount });
            })
            .catch((error) => {
                console.error('Failed to fetch active demo requests:', error);
            });
    }, [activeDemoRequestsDispatch]);

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests?page=${id < 1 ? 1 : id}`);
                const dataResponse = (await response.json()) as ResponseData;

                if (dataResponse) {
                    setPageData({
                        demolength: dataResponse.totalDemoRequests,
                        pageNumber: dataResponse.totalPages,
                    });
                    setCurrentPage(id < 1 ? 1 : id);
                    setDemos(dataResponse);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(index);
    }, [index]);

    useEffect(() => {
        const genPage = () => {
            if (pageData) {
                const genArray = [];
                for (let i = 0; i < pageData.pageNumber; i++) {
                    genArray.push(i + 1);
                }
                if (genArray.length > 0) {
                    setPages([...genArray]);
                }
            }
        };

        genPage();
    }, [pageData]);

    const changeApprove = async () => {
        setRequestStatus("loading");
        const requestBody = { status: "Approved" };
        try {
            const results = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await results.json();
            if (demos?.demoRequests) {
                const updatedDemos = demos.demoRequests.map((content) =>
                    content.id === id ? { ...content, status: "Approved" } : content
                );

                setDemos({ demoRequests: updatedDemos });
            }

            if (data) {
                setRequestStatus("done");
                activeDemoRequestsDispatch({ type: 'DECREMENT', payload: 1 });
                setStatus({ ...status, modal: false });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const disapprove = async () => {
        setRequestStatus("loading");
        const requestBody = { status: "Denied" };
        try {
            const results = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await results.json();

            if (demos?.demoRequests) {
                const updatedDemos = demos.demoRequests.map((content) =>
                    content.id === id ? { ...content, status: "Denied" } : content
                );
                setDemos({ demoRequests: updatedDemos });
            }

            if (data) {
                setRequestStatus("done");
                activeDemoRequestsDispatch({ type: 'DECREMENT', payload: 1 });
                setStatus({ ...status, modal: false });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const changeDisplay = (ids: string, stats: string) => {
        setId(ids);
        setStatus({ ...status, modal: true, state: stats });
    };

    return (
        <div className="bg-[#F9FAFB] border mt-[132px] lg:w-[95%] min-w-[1200px] mx-auto lg:border overflow-x lg:shadow-m w-full mb-10 2xl:mx-auto">
            {demos ? (
                <div className="relative">
                    <div className="w-full">
                        {status.modal && (
                            status.state === "Approve" ? (
                                <div className={`shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                                    <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Approve demo</h1>
                                    <div className="flex flex-col gap-[16px]">
                                        <p className="text-[#667085] font-[400] text-[14px] leading-[20px]">
                                            Are you sure you want to approve this demo? Once approved, the requestor will
                                            receive an email containing test credentials.
                                        </p>
                                        <span className="flex flex-row gap-[8px] mt-[5px] h-[44px]">
                                            <button onClick={() => setStatus({ ...status, modal: false })} className="w-full rounded-[8px] border px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>
                                            <button
                                                onClick={changeApprove}
                                                disabled={requestStatus == "loading"}
                                                className={`flex flex-row gap-[4px] justify-center items-center bg-[#1570EF] w-full font-[600] leading-[20px] text-white rounded-[8px] px-[16px]`}
                                            >
                                                {
                                                    requestStatus == "loading" ?
                                                    <div className="w-6 h-6 border-4 border-l-cyan-400 border-white rounded-full animate-spin"></div>
                                                    :<>Approve</>
                                                }
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className={`shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                                    <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Deny demo</h1>
                                    <div className="flex flex-col gap-[16px]">
                                        <p className="text-[#667085] font-[400] text-[14px] leading-[20px]">
                                            Are you sure you want to deny this demo? Once denied, the requestor will receive an
                                            email notifying them of the decision.
                                        </p>

                                        <span className="flex flex-row gap-[8px] mt-[5px] h-[44px]">
                                            <button onClick={() => setStatus({ ...status, modal: false })} className="rounded-[8px] w-full border px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>
                                            <button
                                                disabled={requestStatus == "loading"}
                                                onClick={disapprove}
                                                className={`flex flex-row gap-[4px] items-center justify-center w-full bg-[#B42318] font-[600] leading-[20px] text-white rounded-[8px] px-[16px]`}
                                            >
                                                {
                                                    requestStatus == "loading" ?
                                                    <div className="w-6 h-6 border-4 border-l-white border-cyan-400 rounded-full animate-spin"></div>
                                                    :<>Deny</>
                                                }
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="grid grid-rows">
                        <div className="bg-white h-[67px] flex items-center w-full">
                            <th className="py-[10px] px-[24px] flex w-full flex-row items-center gap-2">
                                <h1 className="text-[#101828] font-[500] leading-[28px] text-[18px]">Demo requests</h1>
                                <h2 className="font-[#6941C6] font-[500] bg-[#F9F5FF] leading-[18px] text-[12px] p-1 w-[22px] h-[22px] rounded-full text-[#6941C6] flex items-center justify-center">
                                    {activeDemoRequests}
                                </h2>
                            </th>
                        </div>

                        <div>
                            <tr className="border-b h-[44px] bg-[#EAECF0] grid grid-cols-6 justify-between w-full border">
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Name</th>
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Email address</th>
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Demo request date & time</th>
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Project requested</th>
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Status</th>
                                <th className="text-[#667085] text-[12px] py-[12px] px-[24px] font-[500] leading-[18px]">Actions</th>
                            </tr>
                        </div>
                        <div>
                            {demos.demoRequests.map((request, index) => (
                                <tr key={request.id} className={`${index % 2 === 0 ? 'bg-[#F9F5FF]' : 'bg-white'} ${request.status.toLowerCase() === 'denied' ? "opacity-50 select-none pointer-events-none" : ""} p-2 px-4 grid grid-cols-6 justify-between items-center h-[72px]`}>
                                    <td className="text-[#667085] px-[24px] font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{request.fullname}</td>
                                    <td className="text-[#667085] px-[24px] font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{request.emailaddress}</td>
                                    <td className="text-[#667085] px-[24px] font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{getDemoRequestCreationString(request.requestdate, request.requesttime)}</td>
                                    <td className="text-[#667085] px-[24px] font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden line-clamp-1">{request.projectname}</td>
                                    <td className=" px-[24px] flex justify-center font-[400] text-[14px] leading-[20px]">
                                        <h1 className={`
                                            ${request.status.toLowerCase() === 'approved' && 'text-[#027A48] bg-[#ECFDF3]'}
                                            ${request.status.toLowerCase() === 'active' && 'text-[#027A48] bg-[#ECFDF3]'}
                                            ${request.status.toLowerCase() === 'denied' && 'text-[#B42318] bg-[#FEF3F2]'}
                                            text-[#667085] flex items-center justify-center px-[8px] w-fit font-[500] h-[22px] rounded-[16px]
                                        `}>
                                            {request.status.toLowerCase() === "approved" && "Approved"}
                                            {request.status.toLowerCase() === "active" && "Active"}
                                            {request.status.toLowerCase() === "denied" && "Denied"}
                                        </h1>
                                    </td>
                                    <td className="flex px-[24px] justify-center gap-[8px]">
                                        <button
                                            onClick={() => changeDisplay(request.id, "Approve")}
                                            className="bg-[#1570EF] font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px] lg:w-auto"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => changeDisplay(request.id, "Deny")}
                                            className="bg-white border font-[600] leading-[20px] rounded-[8px] py-[10px] px-[16px]"
                                        >
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </div>
                        </div>

                        {/* Pagination controls */}
                        <div className="flex items-center flex-row justify-between gap-12 px-8 bg-white h-[68px]">
                            <button
                                onClick={() => setIndex(index - 1)}
                                className="border gap-[8px] w-fit lg:w-auto inline-flex items-center rounded-[8px] py-[8px] px-[14px]"
                            >
                                <img src={arrowLeft} alt="Previous" />
                                Previous
                            </button>
                            <span className="inline-flex gap-6">
                                {
                                    pages?.length <= 6 ? (
                                        pages?.map((content, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => setIndex(content)} 
                                            className={`${
                                            content === currentPage ? "bg-[#F9F5FF]" : ""
                                            } p-2 rounded-sm px-4 cursor-pointer`}
                                        >
                                            <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
                                        </div>
                                        ))
                                    ) : (
                                    <>
                                        {
                                            currentPage >= 3 && currentPage <= pages?.length - 3 ? (
                                                <>
                                                    <div className="p-2 rounded-sm px-4 cursor-default w-[40px] h-[40px]">
                                                        <span className="text-[#667085] flex items-center justify-center">...</span>
                                                    </div>
                                                    {
                                                        pages?.slice(currentPage - 2, currentPage === pages.length - 3 ? currentPage : currentPage + 1).map((content, index) => (
                                                            <div key={index} onClick={() => setIndex(content)}
                                                            className={`${ content === currentPage ? "bg-[#F9F5FF]" : ""} p-2 rounded-sm px-4 cursor-pointer`}>
                                                            <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            ) : (
                                            <>
                                            {
                                                pages?.slice(0, 3).map((content, index) => (
                                                    <div key={index} onClick={() => setIndex(content)}
                                                    className={`${ content === currentPage ? "bg-[#F9F5FF]" : ""} p-2 rounded-sm px-4 cursor-pointer`}>
                                                    <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {
                                            currentPage === (pages?.length - 3) ||
                                            <div className="p-2 rounded-sm px-4 cursor-default w-[40px] h-[40px]">
                                                <span className="text-[#667085] flex items-center justify-center">...</span>
                                            </div>
                                        }
                                        {
                                            pages?.slice(pages.length - 3).map((content, index) => (
                                                <div
                                                key={index}
                                                onClick={() => setIndex(content)}
                                                className={`${
                                                    content === currentPage ? "bg-[#F9F5FF]" : ""
                                                } p-2 rounded-sm px-4 cursor-pointer`}
                                                >
                                                <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
                                                </div>
                                            ))
                                        }
                                    </>
                                )}
                            </span>
                            <button
                                onClick={() => setIndex(index + 1)}
                                disabled={index >= pageData.pageNumber}
                                className="gap-[8px] items-center inline-flex rounded-[8px] border py-[8px] px-[14px]"
                            >
                                Next
                                <img src={arrowRight} alt="Next" />
                            </button>
                        </div>

                        {/* Modal background */}
                        {status.modal && (
                            <div onClick={() => setStatus({ ...status, modal: false })} className="bg-[#344054B2] backdrop-blur-sm fixed inset-0 top-0 z-30">
                            </div>
                        )}
                    </div>
                ) : (
                    <LinearProgress />
            )}
        </div>
    );
}

