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
