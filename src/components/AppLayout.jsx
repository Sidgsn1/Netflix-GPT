import { Outlet } from "react-router"
import Header from "./Header"

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black">
        <Header />
        <Outlet />
    </div>
  )
}

export default AppLayout