import { useState } from 'react'
import { HiCalendarDays, HiUser, HiChevronDown } from 'react-icons/hi2'
import './Blog.css'

const posts = [
  { id: 1, title: 'Top 10 In-Demand Jobs in Nepal for 2026', author: 'JobsNepal Team', date: 'Jul 10, 2026', category: 'Career Advice', excerpt: 'Discover which industries are hiring the most and what skills employers are looking for this year. From IT to healthcare, the Nepali job market is evolving rapidly.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=340&fit=crop' },
  { id: 2, title: 'How to Write a CV That Gets Shortlisted', author: 'Ramesh Sharma', date: 'Jul 5, 2026', category: 'Resume Tips', excerpt: 'Learn the key elements of a compelling CV that stands out to recruiters in Nepal. Real examples and actionable advice.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=340&fit=crop' },
  { id: 3, title: 'NGO Jobs in Nepal: A Complete Guide', author: 'Anita KC', date: 'Jun 28, 2026', category: 'Job Search', excerpt: 'Everything you need to know about finding and applying for NGO positions in Nepal. From where to look to how to write a compelling cover letter.', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=340&fit=crop' },
  { id: 4, title: 'Remote Work Trends in Nepal', author: 'JobsNepal Team', date: 'Jun 20, 2026', category: 'Career Advice', excerpt: 'How remote work is changing the Nepali job market and what it means for job seekers. Insights from employers who have embraced flexible work.', image: 'https://images.unsplash.com/photo-1590650046871-92c887180603?w=600&h=340&fit=crop' },
  { id: 5, title: 'Interview Tips for Freshers', author: 'Priya Adhikari', date: 'Jun 12, 2026', category: 'Career Advice', excerpt: 'First job interview? Here is everything you need to know to make a great impression and land the offer.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=340&fit=crop' },
  { id: 6, title: 'Highest Paying Jobs in Nepal 2026', author: 'JobsNepal Team', date: 'Jun 5, 2026', category: 'Job Search', excerpt: 'A comprehensive breakdown of the highest paying careers in Nepal across IT, finance, engineering, and more.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=340&fit=crop' },
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
              >
                <div className="bl-img-wrap">
                  <img src={post.image} alt={post.title} className="bl-img" loading="lazy" />
                  <span className="bl-category">{post.category}</span>
                </div>
                <div className="bl-body" onClick={() => setExpanded(expanded === post.id ? null : post.id)}>
                  <h3 className="bl-title">{post.title}</h3>
                  <div className="bl-meta">
                    <span><HiUser /> {post.author}</span>
                    <span><HiCalendarDays /> {post.date}</span>
                  </div>
                  {expanded === post.id && (
                    <div className="bl-excerpt">
                      <p>{post.excerpt}</p>
                    </div>
                  )}
                  <div className="bl-expand">
                    <span>{expanded === post.id ? 'Show less' : 'Read more'}</span>
                    <HiChevronDown className={`bl-chevron ${expanded === post.id ? 'bl-chevron--open' : ''}`} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
