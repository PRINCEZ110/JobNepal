import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiLockClosed } from 'react-icons/hi2'

export default function Forbidden() {
  return (
    <div className="status-page">
      <Helmet>
        <title>403 — Access Denied | JobNepal</title>
        <meta name="description" content="You don't have permission to access this page." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="status-content">
        <span className="status-icon status-icon--error" aria-hidden="true"><HiLockClosed /></span>
        <span className="status-code">403</span>
        <h1 className="status-title">Access Denied</h1>
        <p className="status-desc">You don&apos;t have permission to access this page. Please log in with an authorized account.</p>
        <div className="status-actions">
          <Link to="/login" className="btn btn--primary">Sign In</Link>
          <Link to="/" className="btn btn--outline">
            <HiArrowLeft aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}