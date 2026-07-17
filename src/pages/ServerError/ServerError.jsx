import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiExclamationTriangle } from 'react-icons/hi2'

export default function ServerError() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>500 — Server Error | JobNepal</title>
        <meta name="description" content="Something went wrong on our end. Please try again." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="not-found-content">
        <HiExclamationTriangle style={{ fontSize: 48, color: '#d97706', marginBottom: 16 }} />
        <span className="not-found-code">500</span>
        <h1 className="not-found-title">Server Error</h1>
        <p className="not-found-desc">Something went wrong on our end. Please try again later or contact support if the issue persists.</p>
        <Link to="/" className="not-found-btn">
          <HiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  )
}
