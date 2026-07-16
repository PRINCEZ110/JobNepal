import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './PopularCategories.css'

const categories = [
  {
    name: 'IT & Software',
    desc: 'Developer, Network, Support',
    count: '120+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/1055/1055687.png',
  },
  {
    name: 'NGO / INGO',
    desc: 'Development, Humanitarian',
    count: '200+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135768.png',
  },
  {
    name: 'Hospitality',
    desc: 'Hotel, Travel, Restaurant',
    count: '80+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/854/854894.png',
  },
  {
    name: 'Accounting & Finance',
    desc: 'Audit, Tax, Banking',
    count: '95+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135706.png',
  },
  {
    name: 'Engineering',
    desc: 'Civil, Mechanical, Electrical',
    count: '110+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/2942/2942801.png',
  },
  {
    name: 'Admin / Management',
    desc: 'HR, Operations, Executive',
    count: '150+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/2917/2917996.png',
  },
  {
    name: 'Tender / EOI',
    desc: 'Bids, Proposals, Notices',
    count: '60+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/2885/2885417.png',
  },
  {
    name: 'Teaching / Education',
    desc: 'Academic, Training, Research',
    count: '75+ jobs',
    icon: 'https://cdn-icons-png.flaticon.com/128/2991/2991235.png',
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
            <Link key={cat.name} to="/find-job" className="pc-card">
              <div className="pc-card-top">
                <img src={cat.icon} alt={cat.name} className="pc-icon" />
                <span className="pc-count">{cat.count}</span>
              </div>
              <h3 className="pc-name">{cat.name}</h3>
              <p className="pc-desc">{cat.desc}</p>
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
