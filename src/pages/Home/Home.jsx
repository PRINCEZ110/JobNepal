import { Helmet } from 'react-helmet-async'
import Hero from '../../Components/Hero/Hero.jsx'
import FeaturedJobs from '../../Components/FeaturedJobs/FeaturedJobs.jsx'
import PopularCategories from '../../Components/PopularCategories/PopularCategories.jsx'
import { HowItWorks } from '../../Components/HowItWorks/HowItWorks.jsx'
import TrustSection from '../../Components/TrustSection/TrustSection.jsx'
import TopCompanies from '../../Components/TopCompanies/TopCompanies.jsx'
import { EmployerCTA } from '../../Components/HowItWorks/HowItWorks.jsx'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>JobNepal — Find Jobs in Nepal | Nepal's Job Portal</title>
        <meta name="description" content="Search jobs from companies and NGOs across all 7 provinces of Nepal. Browse by category, company, or keyword and apply directly — free for job seekers." />
        <meta property="og:title" content="JobNepal — Find Jobs in Nepal" />
        <meta property="og:description" content="Search live jobs from companies and NGOs across all 7 provinces of Nepal and apply directly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jobsnepal.com" />
        <meta property="og:locale" content="ne_NP" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="JobNepal — Find Jobs in Nepal" />
        <meta name="twitter:description" content="Search live jobs across all 7 provinces of Nepal and apply directly." />
        <link rel="canonical" href="https://jobsnepal.com" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "JobNepal",
            "url": "https://jobsnepal.com",
            "description": "Nepal's job portal. Search jobs from companies and NGOs across all 7 provinces.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jobsnepal.com/search?keyword={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
      </Helmet>
      <Hero />
      <FeaturedJobs />
      <PopularCategories />
      <HowItWorks />
      <TrustSection />
      <TopCompanies />
      <EmployerCTA />
    </>
  )
}