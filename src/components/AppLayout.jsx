import { Outlet } from "react-router"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop";
import MobileFooter from "./navbar/MobileFooter";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black">
        <ScrollToTop />
        <Header />
        <Outlet />
        <MobileFooter />
    </div>
  )
}

export default AppLayout