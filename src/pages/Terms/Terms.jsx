import './Terms.css'

export default function Terms() {
  return (
    <div className="terms-page">
      <section className="terms-hero">
        <div className="terms-container">
          <h1 className="terms-hero-title">Terms of <span className="terms-accent">Service</span></h1>
          <p className="terms-hero-desc">Last updated: January 2026</p>
        </div>
      </section>

      <section className="terms-content">
        <div className="terms-container">
          <div className="terms-section">
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using JobsNepal, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          </div>
          <div className="terms-section">
            <h2>User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information and keep it updated. Accounts found to be using false information may be suspended.</p>
          </div>
          <div className="terms-section">
            <h2>Job Listings</h2>
            <p>Employers are responsible for the accuracy of their job listings. JobsNepal reserves the right to remove listings that violate our policies or applicable laws.</p>
          </div>
          <div className="terms-section">
            <h2>Prohibited Conduct</h2>
            <p>Users may not post fraudulent, discriminatory, or misleading content. Any misuse of the platform, including spamming or harassment, will result in immediate account termination.</p>
          </div>
          <div className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>JobsNepal acts as a platform connecting employers and job seekers. We are not responsible for the accuracy of job listings or the outcome of any application or hiring process.</p>
          </div>
          <div className="terms-section">
            <h2>Changes to Terms</h2>
            <p>We may update these terms from time to time. Users will be notified of material changes via email or platform notice.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
