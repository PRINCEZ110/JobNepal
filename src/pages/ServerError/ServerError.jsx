import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiExclamationTriangle } from 'react-icons/hi2'

export default function ServerError() {
  return (
    <div className="status-page">
      <Helmet>
        <title>500 — Server Error | JobNepal</title>
        <meta name="description" content="Something went wrong on our end. Please try again." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="status-content">
        <span className="status-icon status-icon--warning" aria-hidden="true"><HiExclamationTriangle /></span>
        <span className="status-code">500</span>
        <h1 className="status-title">Server Error</h1>
        <p className="status-desc">Something went wrong on our end. Please try again later or contact support if the issue persists.</p>
        <div className="status-actions">
          <Link to="/" className="btn btn--primary">
            <HiArrowLeft aria-hidden="true" /> Back to Home
          </Link>
          <Link to="/contact" className="btn btn--outline">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}