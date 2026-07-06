import Navbar from './Components/Navbar/Navbar.jsx'
import Hero from './Components/Hero/Hero.jsx'
import Products from './Components/Products/Products.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularCategories/>
      <main className="pt-[88px]">
        {/* Put your page content here */}
      </main>
    </>
  )
}

export default App