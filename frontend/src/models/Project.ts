export interface Project{
    id?: number
    title?: string
    description?: string
    coverphotourl?: string
    technicaldetailsvideo?: string
    linkeddocs?: string
    createdat?: Date
    updatedat?: Date
    projectfeatures?: ProjectFeature[]
    developmentstack?: DevelopmentStack[]
    improvementareas?: ImprovementArea[]
}

interface ProjectFeature{
    id?: number
    featureName?: string
}

interface DevelopmentStack{
    id?: number
    stackName?: string
}

interface ImprovementArea{
    id?: number
    areaName?: string
}

export default Project