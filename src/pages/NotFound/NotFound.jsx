import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiMagnifyingGlass } from 'react-icons/hi2'

export default function NotFound() {
  return (
    <div className="status-page">
      <Helmet>
        <title>404 — Page Not Found | JobNepal</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="status-content">
        <span className="status-icon status-icon--brand" aria-hidden="true"><HiMagnifyingGlass /></span>
        <span className="status-code">404</span>
        <h1 className="status-title">Page not found</h1>
        <p className="status-desc">The page you're looking for doesn't exist or has been moved.</p>
        <div className="status-actions">
          <Link to="/" className="btn btn--primary">
            <HiArrowLeft aria-hidden="true" /> Back to Home
          </Link>
          <Link to="/search" className="btn btn--outline">Browse Jobs</Link>
        </div>
      </div>
    </div>
  )
}