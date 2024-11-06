// import { Route, Routes } from 'react-router-dom'
import './App.css'
// import ProjectPreview from './pages/ProjectPreview'
// import Projects from './pages/Projects'
// import LoginMethod from './pages/AuthPages/LoginMethod'
// import AddProjectPreview from './pages/AddProject/AddProjectPreview'
// import AddTechnicalDetails from './pages/AddProject/AddTechnicalDetails'
// import AddProjectOverview from './pages/AddProject/AddProjectOverview'
// import Analytics from './pages/AnaltyticsPage'
import Home from './Pages/Home'
// import Demopage from './pages/Demopage'
// import Layout from './components/Layout/Layout'
// import AuthLayout from './components/Layout/AuthLayout'
// import ProtectedRoutes from './components/Layout/ProtectedRoutes'
// import EditProjectOverview from './pages/EditProject/EditProjectOverview'
// import EditTechnicalDetails from './pages/EditProject/EditTechnicalDetails'
// import EditProjectPreview from './pages/EditProject/EditProjectPreview'
import Navbar from './components/Navbar'
import AnalyticsPage from './Pages/AnaltyticsPage'
import LoginMethod from './Pages/AuthPages/LoginMethod'
import ProjectCard from './components/ProjectCard'
import Projects from './Pages/Projects'
import { Routes, Route } from 'react-router-dom'
import ProjectPreview from './Pages/ProjectPreview'
import Demopage from './Pages/Demopage'
function App() {
  return (
    <>
    <Navbar/>
   <Demopage/>
    {/* <Routes>
    <Route path="/projects/:id" element={<ProjectPreview />} />
      
    </Routes> */}
     
    {/* <ProjectCard/> */}

    {/* <Projects/> */}
    {/* <LoginMethod/>
    <AnalyticsPage/> */}
    {/* <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin" element={<Analytics />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<LoginMethod />} />
      </Route>
      <Route path="/" element={<ProtectedRoutes />} />
      <Route path="demo-page" element={<Demopage />} />
    </Route><Route path='/add-project' element={<ProtectedRoutes />}>
        <Route path="project-overview" element={<AddProjectOverview />} />
        <Route path="technical-details" element={<AddTechnicalDetails />} />
        <Route path="preview" element={<AddProjectPreview />} />
      </Route><Route path='/edit-project' element={<ProtectedRoutes />}>
        <Route path="project-overview/:id" element={<EditProjectOverview />} />
        <Route path="technical-details/:id" element={<EditTechnicalDetails />} />
        <Route path="preview/:id" element={<EditProjectPreview />} />
      </Route>
    </Routes> */}
    
    
       </>
  )
}

export default App
