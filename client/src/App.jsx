import { Button } from "@/components/ui/button"
import Login from "./pages/Login"
import Navbar from "./components/ui/Navbar"
import HeroSection from "./pages/student/HeroSection"
import MainLayout from "./Layout/MainLayout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Courses from "./pages/student/Courses"

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:
        <>
        <HeroSection/>
        <Courses/>
        </>
      },
      {
        path:"login",
        element:<Login/>
      }

    ]
  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
