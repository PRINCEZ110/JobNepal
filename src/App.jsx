import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './context/useAuth.js'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import JobDetail from './pages/JobDetail/JobDetail.jsx'
import Auth from './pages/Auth/Auth.jsx'
import HireForm from './pages/HireForm/HireForm.jsx'
import JobSeekerForm from './pages/JobSeekerForm/JobSeekerForm.jsx'
import ByCategory from './pages/ByCategory/ByCategory.jsx'
import ByCompany from './pages/ByCompany/ByCompany.jsx'
import AdvancedSearch from './pages/AdvancedSearch/AdvancedSearch.jsx'
import About from './pages/About/About.jsx'
import Resume from './pages/Resume/Resume.jsx'
import Counseling from './pages/Counseling/Counseling.jsx'
import Blog from './pages/Blog/Blog.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Pricing from './pages/Pricing/Pricing.jsx'
import Solutions from './pages/Solutions/Solutions.jsx'
import FAQ from './pages/FAQ/FAQ.jsx'
import Privacy from './pages/Privacy/Privacy.jsx'
import Terms from './pages/Terms/Terms.jsx'
import './App.css'

function App() {
  const { user } = useAuth()
  const location = useLocation()
  const onAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <>
      {!onAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
        <Route path="/hire" element={<HireForm />} />
        <Route path="/find-job" element={<JobSeekerForm />} />
        <Route path="/jobs/category" element={<ByCategory />} />
        <Route path="/jobs/company" element={<ByCompany />} />
        <Route path="/search" element={<AdvancedSearch />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      {!onAuthPage && <Footer />}
    </>
  )
}

export default App
