interface DemoRequest {
    id?: string,
    projectId?: string,
    fullName: string,
    emailAddress: string,
    requestDate: string,
    requestTime: string,
    comments: string,
    status?: string
    projectName?: string
}

export default DemoRequest