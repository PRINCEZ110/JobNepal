import { Helmet } from 'react-helmet-async'
import { HiSignalSlash, HiArrowPath } from 'react-icons/hi2'

export default function Offline() {
  return (
    <div className="status-page">
      <Helmet>
        <title>Offline — No Internet Connection | JobNepal</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="status-content">
        <span className="status-icon status-icon--muted" aria-hidden="true"><HiSignalSlash /></span>
        <span className="status-code">Offline</span>
        <h1 className="status-title">No Internet Connection</h1>
        <p className="status-desc">You appear to be offline. Please check your connection and try again.</p>
        <div className="status-actions">
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            <HiArrowPath aria-hidden="true" /> Try Again
          </button>
        </div>
      </div>
    </div>
  )
}