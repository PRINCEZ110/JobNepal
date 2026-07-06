import './FeaturedJobs.css'

const featuredJobs = [
  {
    id: 1,
    title: 'Senior Communication and Monitoring Officer',
    company: 'HERD International',
    location: 'Lalitpur',
    type: 'Full Time',
    deadline: '7 Days',
    logo: 'https://img.jobsnepal.com/x-small/3cj9yfF3ofeMAfb3WtRwyYz3MxHetIh9SmNcxhbC.jpeg',
  },
  {
    id: 2,
    title: 'Laravel Developer – Proprietary CMS & ERP Integration',
    company: 'Doublard Design Pvt. Ltd',
    location: 'Kathmandu',
    type: 'Full Time',
    deadline: '14 Days',
    logo: 'https://img.jobsnepal.com/x-small/moiJjFWeCf0D2R1Uj0VrMCAQBOywSnQf15Z8Fgk4.jpg',
  },
  {
    id: 3,
    title: 'Infrastructure Development Officer',
    company: 'Human Practice Foundation',
    location: 'Panchthar District',
    type: 'Contract',
    deadline: '10 Days',
    logo: 'https://img.jobsnepal.com/x-small/UCewfnoD3dsYjZ0mzwfG5rdXkGtHpk0w8ugz5jDO.jpeg',
  },
  {
    id: 4,
    title: 'Accountant (Construction Company)',
    company: 'JobsNepal.com Direct Recruitment Service',
    location: 'Kupondole, Lalitpur',
    type: 'Full Time',
    deadline: '1 Days',
    logo: 'https://img.jobsnepal.com/x-small/7YRawoHo40pxuyrF6yMltf5IH8F0pb2OulmZqG9U.jpeg',
  },
  {
    id: 5,
    title: 'Sales Executive',
    company: 'NIP HOLDINGS PVT LTD',
    location: 'Kathmandu',
    type: 'Full Time',
    deadline: '5 Days',
    logo: 'https://img.jobsnepal.com/x-small/Fkte0tOB8c5CgiCS8FGRVbjUVOIjKMyF4bqOfHUQ.jpeg',
  },
  {
    id: 6,
    title: 'Program Coordinator (Technical)',
    company: 'Caritas Nepal',
    location: 'Lalitpur',
    type: 'Contract',
    deadline: '12 Days',
    logo: 'https://img.jobsnepal.com/x-small/moiJjFWeCf0D2R1Uj0VrMCAQBOywSnQf15Z8Fgk4.jpg',
  },
]

function FeaturedJobs() {
  return (
    <section className="featured-jobs">
      <div className="fj-container">
        <div className="fj-header">
          <h2 className="fj-title">Featured Jobs</h2>
          <p className="fj-subtitle">Hand-picked opportunities from top organizations</p>
        </div>

        <div className="fj-grid">
          {featuredJobs.map((job) => (
            <div key={job.id} className="fj-card">
              <div className="fj-card-top">
                <div className="fj-card-header">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="fj-company-logo"
                  />
                  <span className="fj-deadline">{job.deadline}</span>
                </div>
                <h3 className="fj-job-title">{job.title}</h3>
                <p className="fj-company-name">{job.company}</p>
              </div>
              <div className="fj-card-bottom">
                <span className="fj-location">{job.location}</span>
                <span className="fj-job-type">{job.type}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="fj-footer">
          <a href="#" className="fj-view-all">View All Jobs</a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
