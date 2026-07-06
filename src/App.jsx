import Navbar from './Components/Navbar/Navbar.jsx'
import Hero from './Components/Hero/Hero.jsx'
import FeaturedJobs from './Components/FeaturedJobs/FeaturedJobs.jsx'
import PopularCategories from './Components/PopularCategories/PopularCategories.jsx'
import WhyChooseUs from './Components/WhyChooseUs/WhyChooseUs.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedJobs/>
      <PopularCategories/>
      <WhyChooseUs/>
      <main className="pt-[88px]">
        {/* Put your page content here */}
      </main>
    </>
  )
}

export default App