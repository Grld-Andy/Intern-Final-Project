import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './Pages/ProjectPreview'
import Projects from './Pages/Projects'
import AddProjectPreview from './Pages/AddProjectPreview'
import AddProject from './Pages/AddProject'

function App() {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      {/* <Route path="/projects/:id" element={<ProjectPreview />} /> */}
      <Route path="/project-preview" element={<ProjectPreview />} />
      <Route path="/add-project" element={<AddProject />} />
      <Route path="/add-project-preview" element={<AddProjectPreview />} />
    </Routes>
  )
}

export default App
