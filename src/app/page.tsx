'use client'
import Home from "@/components/Home"
import Home2 from "@/components/Home2"
import Home3 from "@/components/Home3"
import ThinTopbar from "@/components/OfferBar"
import Testimonials from "@/components/Testimonials"

function HomePage() {
  return (
    <div>
      <div className="select-none">
      <div className="mt-6"><ThinTopbar/></div>
      <Home />
      </div>
      <Home2 />
      <Home3 />
      <Testimonials />
    </div>
  )
}

export default HomePage