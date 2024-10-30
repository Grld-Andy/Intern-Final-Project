import Project from "../models/Project"

const validateProjectForm = (projectForm: Project, formData: FormData) => {
    if (projectForm.title !== undefined) formData.append('title', projectForm.title)
    if (projectForm.description !== undefined) formData.append('description', projectForm.description)
    if (projectForm.linkeddocs !== undefined) formData.append('linkeddocs', projectForm.linkeddocs)
    if (projectForm.projectfeatures){
        projectForm.projectfeatures.forEach(feature => {
            if (feature.id !== undefined) formData.append('projectfeatures[]', JSON.stringify(feature))
        })
    }
    if (projectForm.developmentstack) {
        projectForm.developmentstack.forEach(stack => {
            if (stack.id !== undefined) formData.append('developmentstack[]', JSON.stringify(stack))
        })
    }
    if (projectForm.improvementareas) {
        projectForm.improvementareas.forEach(area => {
            if (area.id !== undefined) formData.append('improvementareas[]', JSON.stringify(area))
        })
    }
    return formData
}

export default validateProjectForm