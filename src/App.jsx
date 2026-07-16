import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import JobDetail from './pages/JobDetail/JobDetail.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import HireForm from './pages/HireForm/HireForm.jsx'
import JobSeekerForm from './pages/JobSeekerForm/JobSeekerForm.jsx'
import ByCategory from './pages/ByCategory/ByCategory.jsx'
import ByCompany from './pages/ByCompany/ByCompany.jsx'
import AdvancedSearch from './pages/AdvancedSearch/AdvancedSearch.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hire" element={<HireForm />} />
        <Route path="/find-job" element={<JobSeekerForm />} />
        <Route path="/jobs/category" element={<ByCategory />} />
        <Route path="/jobs/company" element={<ByCompany />} />
        <Route path="/search" element={<AdvancedSearch />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
