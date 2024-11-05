import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './Pages/ProjectPreview'
import Projects from './Pages/Projects'
import LoginMethod from './Pages/AuthPages/LoginMethod'
import AddProjectPreview from './Pages/AddProject/AddProjectPreview'
import AddTechnicalDetails from './Pages/AddProject/AddTechnicalDetails'
import AddProjectOverview from './Pages/AddProject/AddProjectOverview'
import AnalyticsPage from './Pages/AnaltyticsPage'
import Home from './Pages/Home'
import Demopage from './Pages/Demopage'
import Layout from './components/Layout/Layout'
import AuthLayout from './components/Layout/AuthLayout'
import ProtectedRoutes from './components/Layout/ProtectedRoutes'
import EditProjectOverview from './Pages/EditProject/EditProjectOverview'
import EditTechnicalDetails from './Pages/EditProject/EditTechnicalDetails'
import EditProjectPreview from './Pages/EditProject/EditProjectPreview'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:id' element={<ProjectPreview />} />
        <Route path='/admin' element={<AnalyticsPage />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<LoginMethod />} />
      </Route>
      <Route path='/' element={<ProtectedRoutes/>}>
        <Route path='demo-page' element={<Demopage/>} />
      </Route>
      <Route path='/add-project' element={<ProtectedRoutes/>}>
        <Route path='project-overview' element={<AddProjectOverview />} />
        <Route path='technical-details' element={<AddTechnicalDetails />} />
        <Route path='preview' element={<AddProjectPreview />} />
      </Route>
      <Route path='/edit-project' element={<ProtectedRoutes />}>
        <Route path='project-overview/:id' element={<EditProjectOverview />} />
        <Route path='technical-details/:id' element={<EditTechnicalDetails />} />
        <Route path='preview/:id' element={<EditProjectPreview />} />
      </Route>
    </Routes>
  )
}

export default App
