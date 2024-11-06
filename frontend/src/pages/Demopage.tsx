import { useEffect, useState } from "react";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import { CircularProgress, LinearProgress } from "@mui/material";
import Box from '@mui/material/Box';
import getDemoRequestCreationString from "../utils/getDemoRequestCreationString";
import axios from "axios";

type Request = {
    id: string;
    emailaddress: string;
    projectname: string;
    fullname: string;
    requestdate: string;
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
    const [data, setData] = useState<Data | null>(null);
    const [pageData, setPageData] = useState<PageData>({
        demolength: null,
        pageNumber: 0,
    });
    const [activeDemos, setActiveDemos] = useState<number>(0)
    const [pages, setPages] = useState<Array<number>>([]);
    const [index, setIndex] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ modal: false, state: "" });
    const [id, setId] = useState<string | number>(0);

    const fetchData = async (id: number) => {
        try {
            const response = await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests?page=${id < 1 ? 1 : id}`);
            const dataResponse = (await response.json()) as ResponseData;

            if (dataResponse) {
                setPageData({
                    ...pageData,
                    demolength: dataResponse.totalDemoRequests,
                    pageNumber: dataResponse.totalPages,
                });
                setData(dataResponse);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const genPage = () => {
        if (pageData) {
            const genArray = [];
            for (let i = 0; i < pageData.pageNumber; i++) {
                genArray.push(i + 1);
            }

            if (genArray.length > 0) {
                return setPages([...genArray]);
            }
        }
    };

    useEffect(() => {
        axios.get("https://intern-final-project.onrender.com/api/v1/demo-requests/active/count")
        .then((res) =>{
            setActiveDemos(res.data.activeDemoRequestsCount)
        }).catch(() => {
            console.log("error")
        })
    }, [])

    useEffect(() => {
        fetchData(index);
    }, [fetchData, index]);

    useEffect(() => {
        genPage();
    }, [genPage, pageData.pageNumber]);

    const changeApprove = async () => {
        setLoading(true);
        const requestBody = { status: "Approved" };

        try {
            const results = await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const da = await results.json();
            if (data?.demoRequests) {
                const newm = data.demoRequests.map((content) =>
                    content.id === id ? { ...content, status: "Approved" } : content
                );

                const changedType: Data = {
                    demoRequests: newm,
                };
                setData(changedType);
            }

            if (da) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const disapprove = async () => {
        console.log(id);
        setLoading(true);
        const requestBody = { status: "Denied" };

        try {
            const results = await fetch(`https://intern-final-project.onrender.com/api/v1/demo-requests/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const da = await results.json();

            if (data?.demoRequests) {
                const newm = data.demoRequests.map((content) =>
                    content.id === id ? { ...content, status: "Denied" } : content
                );

                const changedType: Data = {
                    demoRequests: newm,
                };
                setData(changedType);
            }

            console.log(da);

            if (da) {
                setLoading(false);
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
            {data ? (
                <div className="relative">
                    <div className="w-full">
                        {status.modal && (
                            status.state === "Approve" ? (
                                <div className="shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span>
                                        <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Approve demo</h1>
                                    </span>

                                    <div>
                                        <p>
                                            Are you sure you want to approve this demo? Once approved, the requestor will
                                            receive an email containing test credentials.
                                        </p>

                                        <span className="flex flex-row gap-[8px] mt-[5px]">
                                            <button onClick={() => setStatus({ ...status, modal: false })} className="rounded-[8px] border py-[10px] px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>

                                            <button
                                                onClick={changeApprove}
                                                disabled={loading}
                                                className={`${loading && 'flex flex-row gap-[4px] items-center'} bg-[#1570EF] font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px]`}
                                            >
                                                Approve
                                                {loading && (
                                                    <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress color={"info"} />
                                                    </Box>
                                                )}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="shadow-lg z-40 fixed bg-white lg:w-[479px] rounded-[8px] p-[24px] space-y-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span>
                                        <h1 className="text-[#344054] font-[600] text-[18px] leading-[28px]">Deny demo</h1>
                                    </span>
                                    <div>
                                        <p>
                                            Are you sure you want to deny this demo? Once denied, the requestor will receive an
                                            email notifying them of the decision.
                                        </p>

                                        <span className="flex flex-row gap-[8px] mt-[5px]">
                                            <button onClick={() => setStatus({ ...status, modal: false })} className="rounded-[8px] border py-[10px] px-[16px] text-[#344054] font-[600] text-[18px] leading-[28px]">Cancel</button>

                                            <button
                                                disabled={loading}
                                                onClick={disapprove}
                                                className={`${loading && 'flex flex-row gap-[4px] items-center'} bg-[#B42318] font-[600] leading-[20px] text-white rounded-[8px] py-[10px] px-[16px]`}
                                            >
                                                Deny
                                                {loading && (
                                                    <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress color={"info"} />
                                                    </Box>
                                                )}
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
                                    {activeDemos}
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
                            {data.demoRequests.map((request, index) => (
                                <tr key={request.id} className={`${index % 2 === 0 ? 'bg-[#F9F5FF]' : 'bg-white'} p-2 px-4 grid grid-cols-6 justify-between items-center h-[72px]`}>
                                    <td className="text-[#667085] px-[24px] text-center font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{request.fullname}</td>
                                    <td className="text-[#667085] px-[24px] text-center font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{request.emailaddress}</td>
                                    <td className="text-[#667085] px-[24px] text-center font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden">{getDemoRequestCreationString(request.requestdate)}</td>
                                    <td className="text-[#667085] px-[24px] text-center font-[400] text-[14px] leading-[20px] text-ellipsis overflow-hidden line-clamp-1">{request.projectname}</td>
                                    <td className=" px-[24px] flex justify-center text-center font-[400] text-[14px] leading-[20px]">
                                        <h1 className={`
                                            ${request.status.toLowerCase() === 'approved' && 'text-[#027A48] bg-[#ECFDF3] flex items-center justify-center px-[8px] w-fit font-[500] h-[22px] rounded-[16px]'}
                                            ${request.status.toLowerCase() === 'active' && 'text-[#027A48] bg-[#ECFDF3] flex items-center justify-center px-[8px] w-fit font-[500] h-[22px] rounded-[16px]'}
                                            ${request.status.toLowerCase() === 'denied' && 'text-[#B42318] bg-[#FEF3F2] flex items-center justify-center px-[8px] w-fit font-[500] h-[22px] rounded-[16px]'}
                                            text-[#667085]
                                        `}>
                                            {request.status.toLowerCase() === "approved" && "Approve"}
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
                                {pages?.map((content, index) => (
                                    <div key={index} onClick={() => setIndex(index + 1)} className="bg-[#F9F5FF] p-2 rounded-sm px-4 cursor-pointer">
                                        <h1 className="text-[#7F56D9] font-[500] text-[14px] leading-[20px]">{content}</h1>
                                    </div>
                                ))}
                            </span>

                            <button
                                onClick={() => setIndex(index + 1)}
                                disabled={index >= pageData.pageNumber}
                                className="border gap-[8px] items-center inline-flex rounded-[8px] border py-[8px] px-[14px]"
                            >
                                Next
                                <img src={arrowRight} alt="Next" />
                            </button>
                        </div>

                        {/* Modal background */}
                        {status.modal && (
                            <div onClick={() => setStatus({ ...status, modal: false })} className="bg-[#F9FAFB] backdrop-blur-[16%] bg-opacity-[70%] fixed inset-0 top-0 z-30">
                            </div>
                        )}
                    </div>
                ) : (
                    <LinearProgress />
            )}
        </div>
    );
}

