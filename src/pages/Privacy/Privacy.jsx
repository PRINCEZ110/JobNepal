import './Privacy.css'

export default function Privacy() {
  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <div className="privacy-container">
          <h1 className="privacy-hero-title">Privacy <span className="privacy-accent">Policy</span></h1>
          <p className="privacy-hero-desc">Last updated: January 2026</p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="privacy-container">
          <div className="privacy-section">
            <h2>Information We Collect</h2>
            <p>We collect information you provide when creating an account, posting a job, or applying for a position. This includes your name, email address, phone number, resume, and work history.</p>
          </div>
          <div className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>Your information is used to facilitate job applications, improve our services, send relevant job alerts, and communicate with you about your account. We never sell your personal data to third parties.</p>
          </div>
          <div className="privacy-section">
            <h2>Data Security</h2>
            <p>We implement industry-standard encryption and security measures to protect your personal information. All data is stored securely and accessed only by authorized personnel.</p>
          </div>
          <div className="privacy-section">
            <h2>Cookies</h2>
            <p>We use cookies to enhance your experience, analyze traffic, and personalize content. You can control cookie preferences through your browser settings.</p>
          </div>
          <div className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have questions about this policy, contact us at info@jobsnepal.com or call 01-544 7710.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
