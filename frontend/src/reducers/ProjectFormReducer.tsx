import Project from "../models/Project"

export const ProjectFormReducer = (state: Project|null, action: {type: string, payload: Project|null}) => {
    switch (action.type) {
        case "UPDATE_PROJECT":
            return {...state, ...action.payload}
        case "CLEAR_PROJECT":
            return null
        default:
            return state
    }
}