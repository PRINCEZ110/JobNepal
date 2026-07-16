import { HiChevronDown } from 'react-icons/hi2'
import { useState } from 'react'
import './FAQ.css'

const faqs = [
  { q: 'How do I create an account?', a: 'Click "Register Free" in the top right corner. Fill in your details and verify your email address. It takes less than 2 minutes.' },
  { q: 'Is JobsNepal free for job seekers?', a: 'Yes, absolutely. All services for job seekers are completely free — no hidden charges or premium plans.' },
  { q: 'How do I apply for a job?', a: 'Browse job listings, click on a position that interests you, and hit "Apply Now". You can upload your CV and cover letter directly.' },
  { q: 'How can employers post a job?', a: 'Create an employer account, choose a pricing plan, and post your job. Your listing will go live after a quick verification.' },
  { q: 'Can I edit or remove my job listing?', a: 'Yes, you can edit or close your job listing anytime from your employer dashboard.' },
  { q: 'How long do job listings stay active?', a: 'Free listings stay active for 30 days. Standard and Premium plans offer 60-day listings with options to extend.' },
  { q: 'Is my personal information secure?', a: 'Yes. We use industry-standard encryption and security practices. Your data is never shared without your consent.' },
  { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page. We will send a password reset link to your registered email.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-container">
          <h1 className="faq-hero-title">Frequently Asked <span className="faq-accent">Questions</span></h1>
          <p className="faq-hero-desc">Everything you need to know about JobsNepal.</p>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="faq-container">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span>{faq.q}</span>
                  <HiChevronDown className="faq-chevron" />
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
