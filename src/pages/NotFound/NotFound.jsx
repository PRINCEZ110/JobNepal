import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi2'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>404 — Page Not Found | JobNepal</title>
      </Helmet>
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-desc">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="not-found-btn">
          <HiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  )
}
