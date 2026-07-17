import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from './context/useAuth.js'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Auth from './pages/Auth/Auth.jsx'

const JobDetail = lazy(() => import('./pages/JobDetail/JobDetail.jsx'))
const HireForm = lazy(() => import('./pages/HireForm/HireForm.jsx'))
const JobSeekerForm = lazy(() => import('./pages/JobSeekerForm/JobSeekerForm.jsx'))
const ByCategory = lazy(() => import('./pages/ByCategory/ByCategory.jsx'))
const ByCompany = lazy(() => import('./pages/ByCompany/ByCompany.jsx'))
const AdvancedSearch = lazy(() => import('./pages/AdvancedSearch/AdvancedSearch.jsx'))
const About = lazy(() => import('./pages/About/About.jsx'))
const Resume = lazy(() => import('./pages/Resume/Resume.jsx'))
const Counseling = lazy(() => import('./pages/Counseling/Counseling.jsx'))
const Blog = lazy(() => import('./pages/Blog/Blog.jsx'))
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'))
const Pricing = lazy(() => import('./pages/Pricing/Pricing.jsx'))
const Solutions = lazy(() => import('./pages/Solutions/Solutions.jsx'))
const FAQ = lazy(() => import('./pages/FAQ/FAQ.jsx'))
const Privacy = lazy(() => import('./pages/Privacy/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))

import './App.css'

function PageLoader() {
  return <div className="page-loader" />
}

function App() {
  const { user } = useAuth()
  const location = useLocation()
  const onAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  if (!user) {
    return (
      <>
        <Helmet>
          <title>JobNepal — Find Jobs in Nepal | Nepal's #1 Job Portal</title>
          <meta name="description" content="Browse thousands of jobs from top companies and NGOs across all 7 provinces of Nepal. Free job portal for job seekers and employers." />
        </Helmet>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>JobNepal — Find Jobs in Nepal | Nepal's #1 Job Portal</title>
        <meta name="description" content="Browse thousands of jobs from top companies and NGOs across all 7 provinces of Nepal." />
      </Helmet>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {!onAuthPage && <Navbar />}
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!onAuthPage && <Footer />}
    </>
  )
}

export default App
