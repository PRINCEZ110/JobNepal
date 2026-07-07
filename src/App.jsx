import Navbar from './Components/Navbar/Navbar.jsx'
import Hero from './Components/Hero/Hero.jsx'
import FeaturedJobs from './Components/FeaturedJobs/FeaturedJobs.jsx'
import PopularCategories from './Components/PopularCategories/PopularCategories.jsx'
import WhyChooseUs from './Components/WhyChooseUs/WhyChooseUs.jsx'
import TopCompanies from './Components/TopCompanies/TopCompanies.jsx'
import CTA from './Components/CTA/CTA.jsx'
import Footer from './Components/Footer/Footer.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedJobs/>
      <PopularCategories/>
      <WhyChooseUs/>
      <TopCompanies/>
      <CTA/>
      <Footer/>
    </>
  )
}

export default App
