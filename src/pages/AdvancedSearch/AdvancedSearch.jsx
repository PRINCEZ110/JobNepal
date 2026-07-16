import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase, HiCurrencyDollar, HiXMark } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './AdvancedSearch.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Hospitality', 'Engineering', 'Teaching / Education', 'Admin / Management', 'Tender / EOI']
const jobTypes = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship']
const locations = ['All', 'Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet', 'Panchthar District', 'Kupondole, Lalitpur']

export default function AdvancedSearch() {
  const [keyword, setKeyword] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchKeyword = !keyword || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.company.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase())
      const matchLocation = locationFilter === 'All' || job.location.includes(locationFilter)
      const matchCategory = categoryFilter === 'All' || job.category === categoryFilter
      const matchType = typeFilter === 'All' || job.type === typeFilter
      return matchKeyword && matchLocation && matchCategory && matchType
    })
  }, [keyword, locationFilter, categoryFilter, typeFilter])

  const clearAll = () => {
    setKeyword('')
    setLocationFilter('All')
    setCategoryFilter('All')
    setTypeFilter('All')
  }

  return (
    <div className="as-page">
      <section className="as-hero">
        <div className="as-container">
          <span className="as-tag">Find Jobs</span>
          <h1 className="as-hero-title">Advanced <span className="as-accent">Job Search</span></h1>
          <p className="as-hero-desc">Find exactly what you're looking for with powerful filters</p>
        </div>
      </section>

      <section className="as-main">
        <div className="as-container">
          <div className="as-layout">
            <aside className="as-sidebar">
              <div className="as-sidebar-card">
                <div className="as-sidebar-header">
                  <h3>Filters</h3>
                  <button className="as-clear-btn" onClick={clearAll}>Clear all</button>
                </div>

                <div className="as-filter-group">
                  <label>Keyword</label>
                  <div className="as-search-wrap">
                    <HiMagnifyingGlass className="as-search-icon" />
                    <input type="text" placeholder="Job title, skill, company..." value={keyword} onChange={e => setKeyword(e.target.value)} />
                    {keyword && <HiXMark className="as-clear-icon" onClick={() => setKeyword('')} />}
                  </div>
                </div>

                <div className="as-filter-group">
                  <label>Category</label>
                  <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="as-filter-group">
                  <label>Location</label>
                  <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                    {locations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div className="as-filter-group">
                  <label>Job Type</label>
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </aside>

            <div className="as-results-section">
              <div className="as-toolbar">
                <span className="as-result-count">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</span>
                {(keyword || categoryFilter !== 'All' || typeFilter !== 'All' || locationFilter !== 'All') && (
                  <button className="as-clear-all-btn" onClick={clearAll}>Clear filters</button>
                )}
              </div>

              {filteredJobs.length === 0 ? (
                <div className="as-empty">
                  <HiBriefcase size={48} />
                  <h3>No jobs match your criteria</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="as-clear-btn-lg" onClick={clearAll}>Clear All Filters</button>
                </div>
              ) : (
                <div className="as-results">
                  {filteredJobs.map(job => (
                    <Link key={job.id} to={`/job/${job.id}`} className="as-card">
                      <div className="as-card-header">
                        <img src={job.logo} alt={job.company} className="as-logo" />
                        <div className="as-card-header-info">
                          <h3 className="as-job-title">{job.title}</h3>
                          <p className="as-company-name">{job.company}</p>
                        </div>
                        {job.featured && <span className="as-featured">Featured</span>}
                      </div>
                      <p className="as-desc">{job.description.slice(0, 150)}...</p>
                      <div className="as-meta">
                        <span><HiMapPin /> {job.location}</span>
                        <span><HiBriefcase /> {job.type}</span>
                        <span><HiCurrencyDollar /> {job.salary}</span>
                      </div>
                      <div className="as-card-footer">
                        <span className="as-category">{job.category}</span>
                        <span className="as-deadline">{job.deadline} left</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
