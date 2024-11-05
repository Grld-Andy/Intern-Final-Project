import Project from '../models/Project'

const validateProjectTechnicalDetailsForm = (data: Project) => {
    if(!data.developmentstack || data.developmentstack.length == 0)
        return "Please provide project development stacks"
    if(!data.technicaldetailsvideo)
        return "Please provide a video about the project"
    if(!data.linkeddocs)
        return "Please provide project list of documentations"
    return ""
}

export default validateProjectTechnicalDetailsForm