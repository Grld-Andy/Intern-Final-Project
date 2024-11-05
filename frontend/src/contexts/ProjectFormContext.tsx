import React, { Dispatch, useReducer } from 'react'
import { createContext } from "react";
import Project from '../models/Project';
import { ProjectFormReducer } from '../reducers/ProjectFormReducer';

interface Props{
    children: React.ReactNode
}

interface ProjectFormContextType{
    projectForm: null|Project
    projectFormDispatch: Dispatch<{type: string, payload: null|Project}>
}

export const ProjectFormContext = createContext<ProjectFormContextType>({
    projectForm: null,
    projectFormDispatch: () => null
})

const initalState: Project|null = null

const ProjectFormContextProvider: React.FC<Props> = (props) => {
    const [projectForm, projectFormDispatch] = useReducer(ProjectFormReducer, initalState)

    return (
        <ProjectFormContext.Provider value={{projectForm, projectFormDispatch}}>
            {props.children}
        </ProjectFormContext.Provider>
    )
}

export default ProjectFormContextProvider
