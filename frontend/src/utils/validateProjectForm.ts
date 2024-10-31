import Project from "../models/Project"

const validateProjectForm = (projectForm: Project, formData: FormData) => {
    if (projectForm.title !== undefined) formData.append('title', projectForm.title)
    if (projectForm.description !== undefined) formData.append('description', projectForm.description)
    if (projectForm.linkeddocs !== undefined) formData.append('linkedDocs', projectForm.linkeddocs)
    if (projectForm.projectfeatures && projectForm.projectfeatures.length > 0){
        formData.append('projectFeatures', JSON.stringify(projectForm.projectfeatures))
    }
    if (projectForm.developmentstack && projectForm.developmentstack.length > 0) {
        formData.append('developmentStack', JSON.stringify(projectForm.developmentstack))
    }
    if (projectForm.improvementareas && projectForm.improvementareas.length > 0) {
        formData.append('improvementAreas', JSON.stringify(projectForm.improvementareas))
    }
    return formData
}

export default validateProjectForm