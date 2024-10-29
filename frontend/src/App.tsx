import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './Pages/ProjectPreview'
import Projects from './Pages/Projects'
import AddProjectPreview from './Pages/AddProject/AddProjectPreview'
import ProjectOverview from './Pages/AddProject/ProjectOverview'
import TechnicalDetails from './Pages/AddProject/TechnicalDetails'

function App() {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      {/* <Route path="/projects/:id" element={<ProjectPreview />} /> */}
      <Route path="/project-preview" element={<ProjectPreview />} />
      <Route path="/project-overview" element={<ProjectOverview />} />
      <Route path="/technical-details" element={<TechnicalDetails />} />
      <Route path="/add-project-preview" element={<AddProjectPreview />} />
    </Routes>
  )
}

export default App
