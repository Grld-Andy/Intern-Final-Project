import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './pages/ProjectPreview'
import Projects from './pages/Projects'
import Login from './pages/AuthPages/Login'
import LoginMethod from './pages/AuthPages/LoginMethod'
import AddProjectPreview from './pages/AddProject/AddProjectPreview'
import ProjectOverview from './pages/AddProject/ProjectOverview'
import TechnicalDetails from './pages/AddProject/TechnicalDetails'
import Analytics from './pages/AnaltyticsPage'
import Home from './pages/Home'
import Layout from './components/Layout/Layout'
import AuthLayout from './components/Layout/AuthLayout'
import ProtectedRoutes from './components/Layout/ProtectedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectPreview />} />
        <Route path="/admin" element={<Analytics />} />
      </Route>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route index element={<LoginMethod />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path='/add-project' element={<ProtectedRoutes/>}>
        <Route path="project-overview" element={<ProjectOverview />} />
        <Route path="technical-details" element={<TechnicalDetails />} />
        <Route path="preview" element={<AddProjectPreview />} />
      </Route>
      <Route path='/edit-project' element={<ProtectedRoutes/>}>
        <Route path="project-overview/:id" element={<ProjectOverview />} />
        <Route path="technical-details/:id" element={<TechnicalDetails />} />
        <Route path="preview/:id" element={<AddProjectPreview />} />
      </Route>
    </Routes>
  )
}

export default App
