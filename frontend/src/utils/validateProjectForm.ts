import Project from "../models/Project"

const validateProjectForm = (projectForm: Project, formData: FormData) => {
    if (projectForm.title !== undefined) formData.append('title', projectForm.title)
    if (projectForm.description !== undefined) formData.append('description', projectForm.description)
    if (projectForm.linkeddocs !== undefined) formData.append('linkedDocs', projectForm.linkeddocs)
    if (projectForm.projectfeatures){
        projectForm.projectfeatures.forEach(feature => {
            if (feature.featureName !== undefined) formData.append('projectFeatures', JSON.stringify(feature))
        })
    }
    if (projectForm.developmentstack) {
        projectForm.developmentstack.forEach(stack => {
            if (stack.stackName !== undefined) formData.append('developmentStack[]', JSON.stringify(stack))
        })
    }
    if (projectForm.improvementareas) {
        projectForm.improvementareas.forEach(area => {
            if (area.areaName !== undefined) formData.append('improvementAreas', JSON.stringify(area))
        })
    }
    return formData
}

export default validateProjectForm