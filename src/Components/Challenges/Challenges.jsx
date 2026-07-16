import './Challenges.css'

const challenges = [
  {
    title: 'Not sure which jobs match your skills?',
    desc: 'Many job seekers waste time applying for positions they are not qualified for. Our smart filters help you find roles that fit your profile.',
  },
  {
    title: 'Tired of scrolling through irrelevant listings?',
    desc: 'With thousands of jobs posted daily, finding the right one can be overwhelming. Use our category and company filters to narrow it down instantly.',
  },
  {
    title: 'Worried about missing application deadlines?',
    desc: 'Each job listing shows clear deadlines and featured badges so you can prioritize applications that need immediate attention.',
  },
  {
    title: 'Struggling to stand out to employers?',
    desc: 'Your resume is your first impression. Get expert tips on resume building and interview prep to increase your chances of landing the job.',
  },
  {
    title: 'Not getting responses from applications?',
    desc: 'Many qualified candidates get overlooked. Our direct recruitment system ensures your application reaches the right person.',
  },
  {
    title: 'Unsure which companies are hiring?',
    desc: 'Browse jobs by company to see which organizations have open positions and learn more about their work culture and values.',
  },
]

function Challenges() {
  return (
    <section className="ch-section">
      <div className="ch-container">
        <div className="ch-header">
          <span className="ch-label">Common Challenges</span>
          <h2 className="ch-title">Fed up with the job search struggle?</h2>
          <p className="ch-subtitle">
            Here are just a few of the problems job seekers face — and how JobsNepal helps you overcome them.
          </p>
        </div>

        <div className="ch-grid">
          {challenges.map((item, i) => (
            <div key={i} className="ch-card">
              <div className="ch-number">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="ch-card-title">{item.title}</h3>
              <p className="ch-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Challenges
