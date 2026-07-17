import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiLockClosed } from 'react-icons/hi2'

export default function Forbidden() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>403 — Access Denied | JobNepal</title>
        <meta name="description" content="You don't have permission to access this page." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="not-found-content">
        <HiLockClosed style={{ fontSize: 48, color: '#dc2626', marginBottom: 16 }} />
        <span className="not-found-code">403</span>
        <h1 className="not-found-title">Access Denied</h1>
        <p className="not-found-desc">You don&apos;t have permission to access this page. Please log in with an authorized account.</p>
        <Link to="/" className="not-found-btn">
          <HiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  )
}
