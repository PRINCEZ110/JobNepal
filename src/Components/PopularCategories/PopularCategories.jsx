import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './PopularCategories.css'

const categories = [
  {
    name: 'IT & Software',
    desc: 'Developer, Network, Support',
    count: '120+ jobs',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'NGO / INGO',
    desc: 'Development, Humanitarian',
    count: '200+ jobs',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Hospitality',
    desc: 'Hotel, Travel, Restaurant',
    count: '80+ jobs',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Accounting & Finance',
    desc: 'Audit, Tax, Banking',
    count: '95+ jobs',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Engineering',
    desc: 'Civil, Mechanical, Electrical',
    count: '110+ jobs',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Admin / Management',
    desc: 'HR, Operations, Executive',
    count: '150+ jobs',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Tender / EOI',
    desc: 'Bids, Proposals, Notices',
    count: '60+ jobs',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&auto=format',
  },
  {
    name: 'Teaching / Education',
    desc: 'Academic, Training, Research',
    count: '75+ jobs',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format',
  },
]

function PopularCategories() {
  return (
    <section className="pc-section">
      <div className="pc-container">
        <div className="pc-header">
          <span className="pc-label">Categories</span>
          <h2 className="pc-title">Browse jobs by category</h2>
          <p className="pc-subtitle">Explore opportunities across industries and find your perfect role</p>
        </div>

        <div className="pc-grid">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/find-job?category=${encodeURIComponent(cat.name)}`} className="pc-card" style={{ backgroundImage: `url(${cat.image})` }}>
              <div className="pc-card-overlay" />
              <div className="pc-card-content">
                <span className="pc-count">{cat.count}</span>
                <h3 className="pc-name">{cat.name}</h3>
                <p className="pc-desc">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pc-footer">
          <Link to="/find-job" className="pc-view-all">View all categories <HiArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}

export default PopularCategories
