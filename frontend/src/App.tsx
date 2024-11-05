import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectPreview from './Page/ProjectPreview'
import Projects from './Page/Projects'
import LoginMethod from './Page/AuthPages/LoginMethod'
import AddProjectPreview from './Page/AddProject/AddProjectPreview'
import AddTechnicalDetails from './Page/AddProject/AddTechnicalDetails'
import AddProjectOverview from './Page/AddProject/AddProjectOverview'
import AnalyticsPage from './Page/AnaltyticsPage'
import Home from './Page/Home'
import Demopage from './Page/Demopage'
import Layout from './components/Layout/Layout'
import AuthLayout from './components/Layout/AuthLayout'
import ProtectedRoutes from './components/Layout/ProtectedRoutes'
import EditProjectOverview from './Page/EditProject/EditProjectOverview'
import EditTechnicalDetails from './Page/EditProject/EditTechnicalDetails'
import EditProjectPreview from './Page/EditProject/EditProjectPreview'

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
