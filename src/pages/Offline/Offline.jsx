import { Helmet } from 'react-helmet-async'
import { HiSignalSlash, HiArrowPath } from 'react-icons/hi2'

export default function Offline() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>Offline — No Internet Connection | JobNepal</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="not-found-content">
        <HiSignalSlash style={{ fontSize: 48, color: '#64748b', marginBottom: 16 }} />
        <span className="not-found-code" style={{ color: '#64748b' }}>Offline</span>
        <h1 className="not-found-title">No Internet Connection</h1>
        <p className="not-found-desc">You appear to be offline. Please check your connection and try again.</p>
        <button
          className="not-found-btn"
          onClick={() => window.location.reload()}
          style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <HiArrowPath /> Try Again
        </button>
      </div>
    </div>
  )
}
