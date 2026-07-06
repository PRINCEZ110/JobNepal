import './PopularCategories.css'

const categories = [
  { name: 'IT Jobs', count: '120+', icon: '💻' },
  { name: 'NGO/INGO Jobs', count: '200+', icon: '🤝' },
  { name: 'Hospitality Jobs', count: '80+', icon: '🏨' },
  { name: 'Accounting', count: '95+', icon: '📊' },
  { name: 'Engineering', count: '110+', icon: '🔧' },
  { name: 'Admin/Management', count: '150+', icon: '📋' },
  { name: 'Tender Notice, EOI', count: '60+', icon: '📄' },
  { name: 'Teaching/Education', count: '75+', icon: '📚' },
]

function PopularCategories() {
  return (
    <section className="popular-categories">
      <div className="pc-container">
        <div className="pc-header">
          <h2 className="pc-title">Popular Categories</h2>
          <p className="pc-subtitle">Explore jobs by category and find your perfect role</p>
        </div>

        <div className="pc-grid">
          {categories.map((cat) => (
            <a key={cat.name} href="#" className="pc-card">
              <span className="pc-icon">{cat.icon}</span>
              <span className="pc-name">{cat.name}</span>
              <span className="pc-count">{cat.count} jobs</span>
            </a>
          ))}
        </div>

        <div className="pc-footer">
          <a href="#" className="pc-view-all">See all categories</a>
        </div>
      </div>
    </section>
  )
}

export default PopularCategories