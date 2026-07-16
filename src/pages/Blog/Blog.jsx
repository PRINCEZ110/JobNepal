import { useState } from 'react'
import { HiCalendarDays, HiUser, HiTag } from 'react-icons/hi2'
import './Blog.css'

const posts = [
  { id: 1, title: 'Top 10 In-Demand Jobs in Nepal for 2026', author: 'JobsNepal Team', date: 'Jul 10, 2026', category: 'Career Advice', excerpt: 'Discover which industries are hiring the most and what skills employers are looking for this year.' },
  { id: 2, title: 'How to Write a CV That Gets Shortlisted', author: 'Ramesh Sharma', date: 'Jul 5, 2026', category: 'Resume Tips', excerpt: 'Learn the key elements of a compelling CV that stands out to recruiters in Nepal.' },
  { id: 3, title: 'NGO Jobs in Nepal: A Complete Guide', author: 'Anita KC', date: 'Jun 28, 2026', category: 'Job Search', excerpt: 'Everything you need to know about finding and applying for NGO positions in Nepal.' },
  { id: 4, title: 'Remote Work Trends in Nepal', author: 'JobsNepal Team', date: 'Jun 20, 2026', category: 'Career Advice', excerpt: 'How remote work is changing the Nepali job market and what it means for job seekers.' },
]

export default function Blog() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="blog-container">
          <h1>JobsNepal Blog</h1>
          <p>Career advice, job search tips, and insights for Nepali professionals</p>
        </div>
      </div>
      <div className="blog-container">
        <div className="blog-grid">
          {posts.map(post => (
            <div
              key={post.id}
              className="blog-card"
              onClick={() => setSelected(selected === post.id ? null : post.id)}
            >
              <div className="blog-card-header">
                <span className="blog-category"><HiTag /> {post.category}</span>
                <span className="blog-date"><HiCalendarDays /> {post.date}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-author"><HiUser /> By {post.author}</p>
              {selected === post.id && <p className="blog-excerpt">{post.excerpt}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
