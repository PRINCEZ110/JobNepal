import Hero from '../../Components/Hero/Hero.jsx'
import FeaturedJobs from '../../Components/FeaturedJobs/FeaturedJobs.jsx'
import PopularCategories from '../../Components/PopularCategories/PopularCategories.jsx'
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs.jsx'
import TopCompanies from '../../Components/TopCompanies/TopCompanies.jsx'
import CTA from '../../Components/CTA/CTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedJobs />
      <PopularCategories />
      <WhyChooseUs />
      <TopCompanies />
      <CTA />
    </>
  )
}
