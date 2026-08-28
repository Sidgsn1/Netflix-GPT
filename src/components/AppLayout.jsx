import { Outlet } from "react-router"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black">
        <ScrollToTop />
        <Header />
        <Outlet />
    </div>
  )
}

export default AppLayout