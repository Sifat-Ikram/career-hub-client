import { Outlet } from "react-router-dom"
import Navbar from "./components/common/Navbar/Navbar"
import Footer from "./components/common/footer/Footer"


function App() {

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
