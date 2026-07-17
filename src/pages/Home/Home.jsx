import { Helmet } from 'react-helmet-async'
import Hero from '../../Components/Hero/Hero.jsx'
import FeaturedJobs from '../../Components/FeaturedJobs/FeaturedJobs.jsx'
import PopularCategories from '../../Components/PopularCategories/PopularCategories.jsx'
import Challenges from '../../Components/Challenges/Challenges.jsx'
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs.jsx'
import TopCompanies from '../../Components/TopCompanies/TopCompanies.jsx'
import ResourcePromo from '../../Components/ResourcePromo/ResourcePromo.jsx'
import CTA from '../../Components/CTA/CTA.jsx'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>JobNepal — Find Jobs in Nepal | Nepal's #1 Job Portal</title>
        <meta name="description" content="Browse 10,000+ jobs from top companies and NGOs across all 7 provinces of Nepal. Free job portal for job seekers and employers." />
        <meta property="og:title" content="JobNepal — Find Jobs in Nepal" />
        <meta property="og:description" content="Nepal's #1 job portal with 10K+ active jobs across all 7 provinces." />
      </Helmet>
      <Hero />
      <FeaturedJobs />
      <PopularCategories />
      <Challenges />
      <WhyChooseUs />
      <TopCompanies />
      <ResourcePromo />
      <CTA />
    </>
  )
}
