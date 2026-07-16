import { useState } from 'react'
import { HiCalendarDays, HiUser, HiTag, HiChevronDown } from 'react-icons/hi2'
import './Blog.css'

const posts = [
  { id: 1, title: 'Top 10 In-Demand Jobs in Nepal for 2026', author: 'JobsNepal Team', date: 'Jul 10, 2026', category: 'Career Advice', excerpt: 'Discover which industries are hiring the most and what skills employers are looking for this year. From IT to healthcare, the Nepali job market is evolving rapidly.' },
  { id: 2, title: 'How to Write a CV That Gets Shortlisted', author: 'Ramesh Sharma', date: 'Jul 5, 2026', category: 'Resume Tips', excerpt: 'Learn the key elements of a compelling CV that stands out to recruiters in Nepal. Real examples and actionable advice.' },
  { id: 3, title: 'NGO Jobs in Nepal: A Complete Guide', author: 'Anita KC', date: 'Jun 28, 2026', category: 'Job Search', excerpt: 'Everything you need to know about finding and applying for NGO positions in Nepal. From where to look to how to write a compelling cover letter.' },
  { id: 4, title: 'Remote Work Trends in Nepal', author: 'JobsNepal Team', date: 'Jun 20, 2026', category: 'Career Advice', excerpt: 'How remote work is changing the Nepali job market and what it means for job seekers. Insights from employers who have embraced flexible work.' },
  { id: 5, title: 'Interview Tips for Freshers', author: 'Priya Adhikari', date: 'Jun 12, 2026', category: 'Career Advice', excerpt: 'First job interview? Here is everything you need to know to make a great impression and land the offer.' },
  { id: 6, title: 'Highest Paying Jobs in Nepal 2026', author: 'JobsNepal Team', date: 'Jun 5, 2026', category: 'Job Search', excerpt: 'A comprehensive breakdown of the highest paying careers in Nepal across IT, finance, engineering, and more.' },
]

export default function Blog() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="bl-page">
      <section className="bl-hero">
        <div className="bl-container">
          <span className="bl-tag">Our Blog</span>
          <h1 className="bl-hero-title">Career insights & <span className="bl-accent">job search tips</span></h1>
          <p className="bl-hero-desc">Expert advice to help you navigate Nepal's job market and advance your career.</p>
        </div>
      </section>

      <section className="bl-main">
        <div className="bl-container">
          <div className="bl-grid">
            {posts.map(post => (
              <article
                key={post.id}
                className={`bl-card ${expanded === post.id ? 'bl-card--expanded' : ''}`}
                onClick={() => setExpanded(expanded === post.id ? null : post.id)}
              >
                <div className="bl-card-meta">
                  <span className="bl-category"><HiTag /> {post.category}</span>
                  <span className="bl-date"><HiCalendarDays /> {post.date}</span>
                </div>
                <h3 className="bl-title">{post.title}</h3>
                <p className="bl-author"><HiUser /> {post.author}</p>
                {expanded === post.id && (
                  <div className="bl-excerpt">
                    <p>{post.excerpt}</p>
                  </div>
                )}
                <div className="bl-card-footer">
                  <HiChevronDown className={`bl-expand-icon ${expanded === post.id ? 'bl-expand-icon--open' : ''}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
