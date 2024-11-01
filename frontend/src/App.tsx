import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './pages/ProjectPreview'
import Projects from './pages/Projects'
import AddProjectPreview from './pages/AddProject/AddProjectPreview'
import ProjectOverview from './pages/AddProject/ProjectOverview'
import TechnicalDetails from './pages/AddProject/TechnicalDetails'
import Analytics from './pages/AnaltyticsPage'
import Home from './pages/Home'
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
