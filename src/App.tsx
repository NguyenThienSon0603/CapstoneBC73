import SideBar from "./pages/SideBar"
import { Router } from "./router"

function App() {
  return (
    <div className="flex mt-5">
      <div><SideBar /></div>
      <div className="w-full px-10">
        <Router />
      </div>
    </div>
  )
}

export default App
