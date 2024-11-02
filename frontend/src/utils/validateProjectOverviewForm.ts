import Project from '../models/Project'

const validateProjectOverviewForm = (data: Project) => {
    if(!data.title)
        return "Please provide project title"
    if(!data.description)
        return "Please provide project description"
    if(!data.coverphotourl)
        return "Please provide an image for the project"
    if(!data.projectfeatures || data.projectfeatures.length == 0)
        return "Please provide project features"
    if(!data.improvementareas || data.improvementareas.length == 0)
        return "Please provide areas of improvement"
    return ""
}

export default validateProjectOverviewForm