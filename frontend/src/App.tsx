import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './ages/ProjectPreview'
import Projects from './ages/Projects'
import AddProjectPreview from './ages/AddProject/AddProjectPreview'
import ProjectOverview from './ages/AddProject/ProjectOverview'
import TechnicalDetails from './ages/AddProject/TechnicalDetails'
import Analytics from './ages/AnaltyticsPage'
import Home from './ages/Home'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectPreview />} />
        <Route path="/add-project/project-overview" element={<ProjectOverview />} />
        <Route path="/add-project/technical-details" element={<TechnicalDetails />} />
        <Route path="/add-project/preview" element={<AddProjectPreview />} />
        <Route path="/edit-project/project-overview/:id" element={<ProjectOverview />} />
        <Route path="/edit-project/technical-details/:id" element={<TechnicalDetails />} />
        <Route path="/edit-project/preview/:id" element={<AddProjectPreview />} />
        <Route path="/admin" element={<Analytics />} />
      </Route>
    </Routes>
  )
}

export default App
