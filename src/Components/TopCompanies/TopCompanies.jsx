import './TopCompanies.css'

const companies = [
  { name: 'World Vision International Nepal', logo: 'https://img.jobsnepal.com/x-small/3cj9yfF3ofeMAfb3WtRwyYz3MxHetIh9SmNcxhbC.jpeg' },
  { name: 'Caritas Nepal', logo: 'https://img.jobsnepal.com/x-small/moiJjFWeCf0D2R1Uj0VrMCAQBOywSnQf15Z8Fgk4.jpg' },
  { name: 'People in Need', logo: 'https://img.jobsnepal.com/x-small/UCewfnoD3dsYjZ0mzwfG5rdXkGtHpk0w8ugz5jDO.jpeg' },
  { name: 'Mercy Corps', logo: 'https://img.jobsnepal.com/x-small/7YRawoHo40pxuyrF6yMltf5IH8F0pb2OulmZqG9U.jpeg' },
  { name: 'Oxfam in Nepal', logo: 'https://img.jobsnepal.com/x-small/Fkte0tOB8c5CgiCS8FGRVbjUVOIjKMyF4bqOfHUQ.jpeg' },
  { name: 'Heifer International Nepal', logo: 'https://img.jobsnepal.com/x-small/acILJlY5IQqSsdu3LADgmpvq7E1vNdtgdTFgvQEm.jpeg' },
  { name: 'SOS Children\'s Villages Nepal', logo: 'https://img.jobsnepal.com/x-small/hucDz77iTzpQ1xiSYBbmhKnLVuRSvzL89PTLu4tB.jpeg' },
  { name: 'DanChurchAid (DCA)', logo: 'https://img.jobsnepal.com/x-small/JoDlGdYGWNLf3jt3WbimDkIzY2RYtbeUPrdLqJe7.png' },
]

function TopCompanies() {
  return (
    <section className="top-companies">
      <div className="tc-container">
        <div className="tc-header">
          <h2 className="tc-title">Top Hiring Companies</h2>
          <p className="tc-subtitle">Leading organizations hiring on JobsNepal</p>
        </div>
        <div className="tc-grid">
          {companies.map((c, i) => (
            <div key={i} className="tc-card">
              <img src={c.logo} alt={c.name} className="tc-logo" />
              <span className="tc-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopCompanies
