import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiCodeBracketSquare, HiHeart, HiCalculator, HiArrowTrendingUp, HiBuildingStorefront, HiWrenchScrewdriver, HiAcademicCap, HiClipboardDocumentList, HiDocumentText, HiBriefcase, HiGlobeAlt, HiBanknotes, HiBuildingOffice2 } from 'react-icons/hi2'
import { getCategories } from '../../data/jobsStore.js'
import { Skeleton } from '../ui/Skeleton.jsx'
import './PopularCategories.css'

const categoryIcons = {
  'IT & Software': HiCodeBracketSquare,
  'NGO / INGO': HiGlobeAlt,
  'Accounting & Finance': HiCalculator,
  'Sales': HiArrowTrendingUp,
  'Hospitality': HiBuildingStorefront,
  'Engineering': HiWrenchScrewdriver,
  'Teaching / Education': HiAcademicCap,
  'Admin / Management': HiClipboardDocumentList,
  'Tender / EOI': HiDocumentText,
  'Healthcare': HiHeart,
  'Banking': HiBanknotes,
  'Construction': HiBuildingOffice2,
}

function PopularCategories() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let mounted = true
    getCategories().then((c) => { if (mounted) setCategories(c) })
    return () => { mounted = false }
  }, [])

  return (
    <section className="pc-section">
      <div className="container-main">
        <div className="section-head">
          <span className="section-eyebrow">Categories</span>
          <h2 className="section-title">Browse jobs by category</h2>
          <p className="section-subtitle">Explore open positions across the industries hiring in Nepal right now</p>
        </div>

        <div className="pc-grid">
          {!categories ? (
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="pc-card pc-card--skeleton">
                <Skeleton width={44} height={44} borderRadius={10} />
                <Skeleton width="60%" height={16} />
                <Skeleton width="40%" height={12} />
              </div>
            ))
          ) : categories.length === 0 ? (
            <p className="text-muted">No categories available yet.</p>
          ) : (
            categories.map((cat) => {
              const Icon = categoryIcons[cat.name] || HiBriefcase
              return (
                <Link
                  key={cat.name}
                  to={`/search?category=${encodeURIComponent(cat.name)}`}
                  className="pc-card"
                >
                  <span className="pc-card-icon" aria-hidden="true"><Icon /></span>
                  <span className="pc-name">{cat.name}</span>
                  <span className="pc-count">
                    {cat.count} open job{cat.count !== 1 ? 's' : ''}
                  </span>
                  <span className="pc-arrow" aria-hidden="true"><HiArrowRight /></span>
                </Link>
              )
            })
          )}
        </div>

        <div className="pc-footer">
          <Link to="/jobs/category" className="btn btn--outline">
            View All Categories <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default memo(PopularCategories)