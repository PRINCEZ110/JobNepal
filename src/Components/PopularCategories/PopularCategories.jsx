import './PopularCategories.css'

const categories = [
  { name: 'IT Jobs', count: '120+', icon: 'https://cdn-icons-png.flaticon.com/128/1055/1055687.png' },
  { name: 'NGO/INGO Jobs', count: '200+', icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135768.png' },
  { name: 'Hospitality Jobs', count: '80+', icon: 'https://cdn-icons-png.flaticon.com/128/854/854894.png' },
  { name: 'Accounting', count: '95+', icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135706.png' },
  { name: 'Engineering', count: '110+', icon: 'https://cdn-icons-png.flaticon.com/128/2942/2942801.png' },
  { name: 'Admin/Management', count: '150+', icon: 'https://cdn-icons-png.flaticon.com/128/2917/2917996.png' },
  { name: 'Tender Notice, EOI', count: '60+', icon: 'https://cdn-icons-png.flaticon.com/128/2885/2885417.png' },
  { name: 'Teaching/Education', count: '75+', icon: 'https://cdn-icons-png.flaticon.com/128/2991/2991235.png' },
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
              <img src={cat.icon} alt={cat.name} className="pc-icon" />
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