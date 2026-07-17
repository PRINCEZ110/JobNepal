import './Challenges.css'

const challenges = [
  {
    title: 'Not sure which jobs match your skills?',
    desc: 'Many job seekers waste time applying for positions they are not qualified for. Our smart filters help you find roles that fit your profile.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=420&fit=crop&auto=format',
  },
  {
    title: 'Tired of scrolling through irrelevant listings?',
    desc: 'With thousands of jobs posted daily, finding the right one can be overwhelming. Use our category and company filters to narrow it down instantly.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=420&fit=crop&auto=format',
  },
  {
    title: 'Worried about missing application deadlines?',
    desc: 'Each job listing shows clear deadlines and featured badges so you can prioritize applications that need immediate attention.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=640&h=420&fit=crop&auto=format',
  },
  {
    title: 'Struggling to stand out to employers?',
    desc: 'Your resume is your first impression. Get expert tips on resume building and interview prep to increase your chances of landing the job.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&h=420&fit=crop&auto=format',
  },
  {
    title: 'Not getting responses from applications?',
    desc: 'Many qualified candidates get overlooked. Our direct recruitment system ensures your application reaches the right person.',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=640&h=420&fit=crop&auto=format',
  },
  {
    title: 'Unsure which companies are hiring?',
    desc: 'Browse jobs by company to see which organizations have open positions and learn more about their work culture and values.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=420&fit=crop&auto=format',
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

        <div className="ch-list">
          {challenges.map((item, i) => (
            <div key={i} className={`ch-item ${i % 2 === 1 ? 'ch-item--reverse' : ''}`}>
              <div className="ch-item-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="ch-item-content">
                <span className="ch-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ch-card-title">{item.title}</h3>
                <p className="ch-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Challenges
